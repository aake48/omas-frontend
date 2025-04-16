'use client';

/**
 * ClientGuard
 *
 * Purpose:
 * - Prevents unauthorized access to routes based on login status, role, and club membership.
 * - Admins can access everything.
 * - Logged-in users without a club are only allowed on `/seurat`.
 * - Public routes are always accessible.
 *
 * Behavior:
 * - Reads login data directly from localStorage (userInfo).
 * - Automatically re-checks when the user returns to the tab or localStorage changes.
 * - Redirects users who do not meet access requirements.
 */

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function ClientGuard({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter();
    const pathname = usePathname();

    const [hydrated, setHydrated] = useState(false);
    const [allowAccess, setAllowAccess] = useState(false);

    // Define routes that are always accessible
    const isPublicRoute = ["/seurat", "/kirjaudu", "/rekisteröidy"].some(path =>
        pathname.startsWith(path)
    );

    // Read user info from localStorage
    const getUser = () => {
        try {
            const raw = localStorage.getItem("userInfo");
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    };

    // Check if user is an admin (refactored from nested ternary)
    const isAdminRole = (roles: string[] | string | undefined): boolean => {
        if (Array.isArray(roles)) {
            return roles.some(r => r.endsWith("/admin") || r === "ROLE_ADMIN");
        }
        if (typeof roles === "string") {
            return roles.includes("/admin") || roles.includes("ROLE_ADMIN");
        }
        return false;
    };

    // Main access control logic
    const checkAccess = () => {
        const user = getUser();
        const isLoggedIn = !!user?.username;
        const isAdmin = isAdminRole(user?.roles);
        const hasClub = !!user?.club;

        // Allow if not logged in (public access)
        if (!isLoggedIn || isPublicRoute) {
            setAllowAccess(true);
            return;
        }

        // Allow for admin
        if (isAdmin) {
            setAllowAccess(true);
            return;
        }

        // Allow for users with club
        if (hasClub) {
            setAllowAccess(true);
            return;
        }

        // Allow clubless users to access `/seurat` or `/asetukset`
        if (!hasClub && ["/seurat", "/asetukset"].includes(pathname)) {
            setAllowAccess(true);
            return;
        }

        // Restrict clubless users on other pages
        if (!hasClub && !["/seurat", "/asetukset"].includes(pathname)) {
            router.replace("/seurat");
            return;
        }

        // Fallback
        setAllowAccess(false);
    };

    // Ensure we're running in the browser
    useEffect(() => {
        setHydrated(true);
    }, []);

    // Check access on hydration, route change, or tab focus
    useEffect(() => {
        if (!hydrated) return;

        checkAccess();

        // Listen for updates when switching tabs or localStorage changes
        window.addEventListener("focus", checkAccess);
        window.addEventListener("storage", checkAccess);

        return () => {
            window.removeEventListener("focus", checkAccess);
            window.removeEventListener("storage", checkAccess);
        };
    }, [hydrated, pathname, router]);

    // Don't render anything until access is confirmed
    if (!hydrated || !allowAccess) return null;

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
