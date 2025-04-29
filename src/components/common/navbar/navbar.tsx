"use client";

import Image from "next/image";
import { DrawerDemo } from "../drawer/drawer";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const session = useSession();
    const pathName = usePathname();
    const currentPath = pathName.split("/")[1]; // Get the first segment after "/"

    // Map of path segments to readable page titles
    const pageTitles: Record<string, string> = {
        dashboard: "Main Dashboard",
        settings: "Settings",
        "user-management": "User Management",
        "chat-history": "Chat History",
        "create-new-admin": "Create New Admin",
    };

    // Fallback to "Dashboard" if route isn't in the map
    const pageTitle = pageTitles[currentPath] || "Dashboard";

    return (
        <div className="flex justify-between items-center px-6 h-[70px] 2xl:h-[80px] w-full bg-white shadow-sm">
            {/* Left Section */}
            <div className="flex flex-col">
                {currentPath === "dashboard" && (
                    <span className="text-[#707EAE] font-medium text-xs 2xl:text-sm">
                        Welcome, {session.data?.user?.role === "admin" ? "Admin" : "Super Admin"}
                    </span>
                )}
                <h1 className="text-xl xl:text-[22px] 2xl:text-2xl font-semibold">
                    {pageTitle}
                </h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                {/* Profile Picture with Online Indicator */}
                <div className="relative">
                    <Image
                        src="/images/avatar.png"
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <span className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-white"></span>
                </div>

                {/* Mobile Drawer */}
                <div className="lg:hidden">
                    <DrawerDemo />
                </div>
            </div>
        </div>
    );
}
