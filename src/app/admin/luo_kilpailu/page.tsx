'use client';

import OnlyAdminPermission from "../OnlyAdminPermission";
import adminLoggedIn from "../admin-logged-in";
import AddCompetition from "./AddCompetition";

export default function CreateComp() {

    return (adminLoggedIn()) ?
        (
            <AddCompetition />
        ) :
        (
            <OnlyAdminPermission />
        )
}