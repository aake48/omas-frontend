'use client';

/**
 * ClientGuard
 *
 * Purpose:
 * - Prevents unauthorized access to routes based on login status, role, and club membership.
 * - Admins can access everything.
 * - Logged-in users without a club are only allowed on `/seurat` and `/asetukset`.
 * - Public routes are always accessible.
 *
 * Behavior:
 * - Runs checks in the background without blocking UI.
 * - If access is denied, a notification is shown and user is redirected.
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
    const CLUBLESS_ALLOWED_ROUTES = ["/seurat", "/asetukset"];

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

        // Public routes or not logged in
        if (!isLoggedIn || isPublicRoute) return;

        // Admins or users with club can access anything
        if (isAdmin || hasClub) return;

        // Clubless users can access pages in CLUBLESS_ALLOWED_ROUTES
        if (!hasClub && CLUBLESS_ALLOWED_ROUTES.includes(pathname)) return;

        // Redirect and notify if trying to access anything else
        if (!hasClub && !CLUBLESS_ALLOWED_ROUTES.includes(pathname)) {
            setNotification({
                id: Date.now(),
                type: "error",
                message: "Pääsy estetty. Sinun täytyy liittyä seuraan.",
            });
            if (pathname !== "/seurat") {
                router.replace("/seurat");
            }
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
