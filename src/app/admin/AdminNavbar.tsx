import { Button } from "@/components/ui/Button";
import Link from "next/link";

const adminFeatures = [
    {
        text: "Käyttäjät",
        href: "/admin/kayttajien_hallinta"
    },
    {
        text: "Luo seura",
        href: "/admin/luo_seura"
    },{
        text: "Luo kilpailu",
        href: "/admin/luo_kilpailu"
    },
    {
        text: "Tarkastele kuvia",
        href: "/admin/tarkastele_kuvia"
    }
];


const AdminNavbar = () => {
    return (
        <div className="flex flex-row gap-2">
            {adminFeatures.map((feature: any, index: number) => (
                <Button
                    variant="outline"
                    className="hover:bg-slate-100"
                    key={index}
                >
                    <Link href={feature.href}>{feature.text}</Link>
                </Button>
            ))}
        </div>
    )
}

export default AdminNavbar;