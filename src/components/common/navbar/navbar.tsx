"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { DrawerDemo } from "../drawer/drawer";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center px-6 h-[70px] 2xl:h-[80px] w-full bg-white shadow-sm">
            {/* Left Section */}
            <div className="flex flex-col">
                <span className="text-gray-500 text-sm">Welcome, Admin</span>
                <h1 className="text-xl font-semibold">Main Dashboard</h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative flex items-center">
                    <Search className="absolute left-3 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search for statics"
                        className="w-[200px] md:w-[250px] lg:w-[300px] h-[40px] font-nunito font-normal text-[13px] 2xl:text-[15px] leading-[100%] tracking-[0em] pl-10 pr-4 rounded-lg bg-[#F5F5F56B] text-[#1E265E] focus:outline-none"
                    />
                </div>

                {/* Profile Picture with Online Indicator */}
                <div className="relative">
                    <Image
                        src="/images/nav-img.jpg" // Replace with your actual image path
                        alt="Profile"
                        width={51}
                        height={51}
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
