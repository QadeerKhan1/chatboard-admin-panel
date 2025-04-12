"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_LINKS_DATA } from "@/utils/sidebar-links";
import LinkIcon from "./sidebar-icons/common-icon";
import Logout from "./sidebar-icons/logout";

export default function Sidebar() {
    const pathName = usePathname() ?? ""; // Ensure pathName is always a string


    return (
        <div className="h-screen w-[300px] bg-white flex flex-col justify-between gap-5 pb-[30px]">
            {/* Logo */}
            <section className="space-y-5">
                <div className="flex justify-center items-center py-5">
                    <Image src="/images/main-logo.svg" alt="Logo" width={94} height={94} priority />
                </div>

                {/* Sidebar Links */}
                <nav className="flex flex-col gap-4">
                    {SIDEBAR_LINKS_DATA?.map((data) => {
                        const isActive = pathName === data.link;
                        return (
                            <Link key={data.link} href={data.link} prefetch>
                                <LinkIcon
                                    bgColor={isActive ? "bg-primary" : "bg-cardBg"}
                                    textColor={isActive ? "primary" : "darkGray"}
                                    icon={<data.icon fillColor={isActive ? "#34C759" : "#505050"} />}
                                    text={data.text}
                                />
                            </Link>
                        );
                    })}
                </nav>
            </section>
            <Logout />

        </div>
    );
}
