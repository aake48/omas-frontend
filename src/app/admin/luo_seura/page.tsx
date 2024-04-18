'use client';

import CreateClub from "./CreateClub";
import adminLoggedIn from '../admin-logged-in';
import OnlyAdminPermission from "../OnlyAdminPermission";

export default function ClubCreate() {

    return (adminLoggedIn()) ?
        (
            <CreateClub />
        ) :
        (
            <OnlyAdminPermission />
        )
}