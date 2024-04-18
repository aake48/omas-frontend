'use client';

import OnlyAdminPermission from "../OnlyAdminPermission";
import adminLoggedIn from "../admin-logged-in";
import ImageViewer from "./ImageViewer";

export default function ViewImages() {

    return (adminLoggedIn()) ?
        (
            <ImageViewer />
        ) :
        (
            <OnlyAdminPermission />
        )
}