"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import RightArrow from "@/utils/right-arrow-icon";
import { useRouter } from "next/navigation";

export default function AccountSetting() {
    const router = useRouter();
    return (
        <div className="w-full   rounded-lg">
            <span onClick={(e) => { e.preventDefault; e.stopPropagation(); router.back() }} className="flex justify-center bg-white rounded-[17px] items-center w-[50px] h-[50px]   rotate-180 mb-2 cursor-pointer">
                <RightArrow fillColor='#000000' width={12} height={18} />
            </span>
            {/* Header Section */}
            <div className="bg-white">
                <div className="relative bg-primary h-20 rounded-t-lg flex items-end gap-4 p-4">
                    <div className="absolute flex items-center gap-3 -bottom-20 left-4">
                        <Image
                            src="/images/nav-img.jpg" // Replace with actual profile image
                            alt="User Avatar"
                            width={108}
                            height={108}
                            className="rounded-full border-[7px] border-white"
                        />
                        <div className="mt-8 text-center">
                            <h2 className="text-lg font-bold">Esther Howard</h2>
                            <p className="text-[#ADADB0] text-sm">Esther@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className="mt-28 px-8 pb-8 bg-white ">
                    <h3 className="font-nunito font-medium text-[21px] xl:text-[23px] 2xl:text-[25px] leading-[100%] tracking-[0px] capitalize flex items-center gap-[5px]">
                        <span className="w-[3px] h-[14px] bg-primary"></span>
                        Personal Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[45px] gap-y-8 mt-8">
                        {/* Name */}
                        <div>
                            <label htmlFor="name">Full Name</label>
                            <Input id="name" placeholder="Esther Howard " className="bg-[#EEEEEE6B] text-black font-nunito font-medium text-[17px] 2xl:text-[19px]  leading-[125%] tracking-normal align-bottom" />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Input id="email" placeholder="EstherHoward@gmail.com" className="bg-[#EEEEEE6B] text-black font-nunito font-medium text-[17px] 2xl:text-[19px]  leading-[125%] tracking-normal align-bottom" />
                        </div>
                        <div>
                            <label htmlFor="phone">Phone</label>
                            <Input id="phone" placeholder="123-456-7890" className="bg-[#EEEEEE6B] text-black font-nunito font-medium text-[17px] 2xl:text-[19px]  leading-[125%] tracking-normal align-bottom" />
                        </div>
                        <div className="relative">
                            <label htmlFor="lastName">Last Name</label>
                            <Input id="lastName" placeholder="Khan Khan" className="bg-[#EEEEEE6B] text-black font-nunito font-medium text-[17px] 2xl:text-[19px]  leading-[125%] tracking-normal align-bottom pr-8" />
                            <span className="absolute right-3 top-10 text-gray-400 cursor-pointer">
                                👁️
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button className="bg-primary px-[47px] text-white hover:bg-primary">Update</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
