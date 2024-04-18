'use client';

import OnlyAdminPermission from "../OnlyAdminPermission";
import adminLoggedIn from "../admin-logged-in";
import UsersMain from "./UsersMain";

export default function ManageUsers() {
    return (adminLoggedIn()) ?
        (
            <UsersMain />
        ) :
        (
            <OnlyAdminPermission />
        )
}