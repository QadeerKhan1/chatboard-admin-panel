"use client";
import * as React from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SIDEBAR_LINKS_DATA } from "@/utils/sidebar-links";
import LinkIcon from "@/components/sidebar/sidebar-icons/common-icon";
import Logout from "@/components/sidebar/sidebar-icons/logout";
import Link from "next/link";

export function DrawerDemo() {
    // const pathName = usePathname();
    const pathName = usePathname();

    const [isOpen, setIsOpen] = React.useState(false); // Control drawer state



    // const handleMenuItemEvent = async () => {
    //     await signOut({ callbackUrl: "/login" });
    //     setIsOpen(false);
    //     document.cookie = `$user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    // }




    return (
        <>
            <Drawer open={isOpen} onOpenChange={setIsOpen} direction="left">
                <DrawerTrigger asChild className="lg:hidden">
                    <Image
                        src="/images/hamburger.svg"
                        width={24}
                        height={24}
                        alt="hamburger"
                    />
                </DrawerTrigger>
                <DrawerContent className="h-screen top-0 right-auto p-0 left-0 mt-0 w-[40vw] rounded-none lg:hidden">
                    <div className="flex flex-col ">
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
                </DrawerContent>
            </Drawer>
        </>

    );
}
