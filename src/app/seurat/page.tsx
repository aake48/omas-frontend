import ClubsView from "./ClubsView";
import ClientGuard from "@/app/components/ClientGuard";

export default function SeuratPage() {
    return (
        <ClientGuard>
            <ClubsView />
        </ClientGuard>
    );
}