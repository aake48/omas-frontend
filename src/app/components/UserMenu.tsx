import Link from "next/link";
import { userLinks } from '@/lib/links';

interface UserMenuProps {
    adminLoggedIn: boolean
}

const UserMenu = ({ adminLoggedIn }: UserMenuProps) => {

    let newUserLinks = [...userLinks];
    if (adminLoggedIn) newUserLinks.push(
        {
            text: "Pääkäyttäjä",
            href: "/admin"
        }
    )

    return (
        <div className="flex gap-4 text-xl items-center flex-col overflow-hidden">
            {newUserLinks.map((link, index) => (
                <Link className="hover:text-zinc-400" key={index} href={link.href}>
                    {link.text}
                </Link>
            ))}
        </div>
    );
};

export default UserMenu;
