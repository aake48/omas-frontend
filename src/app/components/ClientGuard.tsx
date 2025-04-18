'use client';

/**
 * ClientGuard
 *
 * Purpose:
 * - Prevents unauthorized access to specific routes based on:
 *   - Login status
 *   - Admin role
 *   - Club membership
 * - Admin users can access all routes.
 * - Regular users without a club can only access `/seurat`, `/asetukset` and `/yhteystiedot`.
 * - Public routes (`/seurat`, `/kirjaudu`, `/rekisteröidy`) are always accessible, even when not logged in.
 *
 * Behavior:
 * - Runs access checks in the background without blocking the UI.
 * - Redirects unauthorized users to `/seurat` with a notification.
 * - Notifications are shown when a user is denied access.
 */

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Notification from "@/components/component/Notification";

export default function ClientGuard({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter();
    const pathname = usePathname();

    const [hydrated, setHydrated] = useState(false);
    const [notification, setNotification] = useState<null | { id: number; message: string; type: 'success' | 'error' }>(null);

    const PUBLIC_ROUTES = ["/seurat", "/kirjaudu", "/rekisteröidy"];
    const CLUBLESS_ALLOWED_ROUTES = ["/seurat", "/asetukset", "/yhteystiedot"];

    const isPublicRoute = PUBLIC_ROUTES.some(path => pathname.startsWith(path));

    // Read user info from localStorage
    const getUser = () => {
        try {
            const raw = localStorage.getItem("userInfo");
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    };

    // Check if user is an admin
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
        const justRegistered = localStorage.getItem("justRegistered") === "true";

        // Public routes or not logged in
        if (!isLoggedIn || isPublicRoute) return;

        // Admins or users with club can access anything
        if (isAdmin || hasClub) return;

        // Clubless users can access pages in CLUBLESS_ALLOWED_ROUTES
        if (!hasClub && CLUBLESS_ALLOWED_ROUTES.includes(pathname)) return;

        // Redirect and notify if trying to access anything else
        if (!hasClub && !CLUBLESS_ALLOWED_ROUTES.includes(pathname)) {
            if (!justRegistered) {
                setNotification({
                    id: Date.now(),
                    type: "error",
                    message: "Pääsy estetty. Sinun täytyy liittyä seuraan.",
                });
            }
            if (pathname !== "/seurat") {
                router.replace("/seurat");
            }
        }

        // Clear the flag so it's only skipped once
        if (justRegistered) {
            localStorage.removeItem("justRegistered");
        }
    };

    useEffect(() => {
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (!hydrated) return;

        checkAccess();

        // Re-check when user switches tabs or localStorage changes
        window.addEventListener("focus", checkAccess);
        window.addEventListener("storage", checkAccess);

        return () => {
            window.removeEventListener("focus", checkAccess);
            window.removeEventListener("storage", checkAccess);
        };
    }, [hydrated, pathname]);

    if (!hydrated) return null;

    return (
        <>
            {children}
            {notification && (
                <Notification
                    key={notification.id}
                    message={notification.message}
                    type={notification.type}
                />
            )}
        </>
    );
}
