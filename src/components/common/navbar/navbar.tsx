"use client";

import Image from "next/image";
import { DrawerDemo } from "../drawer/drawer";
import { useSession } from "next-auth/react";

export default function Navbar() {
    const session = useSession();
    return (
        <div className="flex justify-between items-center px-6 h-[70px] 2xl:h-[80px] w-full bg-white shadow-sm">
            {/* Left Section */}
            <div className="flex flex-col">
                <span className="text-gray-500 text-sm">Welcome, {session.data?.user?.role === "admin" ? "Admin" : "Super Admin"}</span>
                <h1 className="text-xl font-semibold">Main Dashboard</h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                

                {/* Profile Picture with Online Indicator */}
                <div className="relative">
                    <Image
                        src="/images/avatar.png" // Replace with your actual image path
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <span className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-white"></span>
                </div>
                <div className="lg:hidden">
                    <DrawerDemo />
                </div>
            </div>
        </div>
    );
}
