"use client"

import { useEffect, useState } from "react";
import { isJwtExpired } from "@/app/actions";

export async function checkJWTExpiry() {
    const expired = await isJwtExpired(localStorage.getItem('token') || '');
    return expired;
}

const useUserInfo = () => {
    const [storage, setStorage] = useState<Record<string, any>>({});

    useEffect(() => {
        const loadStorage = async () => {
            const expired = await checkJWTExpiry();
            if (expired) {
                setStorage({});
                localStorage.clear();
                window.dispatchEvent(new Event('localStorageChange'));
            } else {
                const allStorage = Object.keys(localStorage).reduce((obj, str) => {
                    let item = localStorage.getItem(str);
                    try {
                        // Check if item is JSON
                        item = JSON.parse(item || 'null');
                    } catch (error) {
                        // If not JSON, leave it as is
                    }
                    return { ...obj, [str]: item };
                }, {});
                setStorage(allStorage);
            }
        };

        loadStorage();  // Initial load of storage


        // Add event listener for the storage event
        window.addEventListener('storage', loadStorage);

        return () => {
            // Cleanup listener when the component unmounts
            window.removeEventListener('storage', loadStorage);
        };
    }, []);

    return storage;
};

export default useUserInfo;
