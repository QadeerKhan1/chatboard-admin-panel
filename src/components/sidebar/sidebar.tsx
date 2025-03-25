"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SIDEBAR_LINKS_DATA } from "@/utils/sidebar-links";
import LinkIcon from "./sidebar-icons/common-icon";

export default function Sidebar() {
    const pathName = usePathname() ?? ""; // Ensure pathName is always a string
    const router = useRouter();

    const clickHandler = (e: React.MouseEvent, link: string) => {
        e.preventDefault();
        router.push(link);
    };

    return (
        <div className="h-screen w-[300px] bg-white flex flex-col gap-5 ">
            {/* Logo */}
            <div className="flex justify-center items-center py-5">
                <Image src="/images/main-logo.svg" alt="Logo" width={94} height={94} />
            </div>

            {/* Sidebar Links */}
            <nav className="flex flex-col gap-4">
                {SIDEBAR_LINKS_DATA.map((data) => {
                    const isActive = pathName.includes(data.link);
                    return (
                        <LinkIcon
                            key={data.text}
                            bgColor={isActive ? "bg-primary" : "bg-cardBg"}
                            textColor={isActive ? "primary" : "darkGray"}
                            icon={<data.icon fillColor={isActive ? "#34C759" : "#505050"} />}
                            text={data.text}
                            onClick={(e) => clickHandler(e, data.link)}
                        />
                    );
                })}
            </nav>

            {/* Logout Button
            <div className="py-5">
                <LinkIcon
                    icon={<Image src="/icons/logout.svg" alt="Logout" width={20} height={20} />}
                    text="Log Out"
                    textColor="text-red-500"
                    bgColor="bg-cardBg"
                    onClick={() => console.log("Logging out...")}
                />
            </div> */}
        </div>
    );
}
