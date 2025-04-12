"use client";

import SearchIcon from "@/components/common/search-field/search-icon";
import Image from "next/image";

const contacts = [
    { id: 1, name: "Esther Howard", message: "ok", time: "", avatar: '/images/marvin.svg', active: true },
    { id: 2, name: "Marvin McKinney", message: "please give me some information ...", time: "4 m Ago", avatar: '/images/marvin.svg', active: false },
    { id: 3, name: "Darlene Robertson", message: "Hey, what's up?", time: "14 m Ago", avatar: '/images/marvin.svg', active: false },
];

export default function ChatSidebar({ onSelectUser }: { onSelectUser: (id: number) => void }) {
    return (
        <div className="w-1/3 flex flex-col  ">
            <div className="relative  h-[60px] bg-white   flex items-center   rounded-[16px]">
                <input type="text" placeholder="Search for Users" className="flex-1 rounded-tl-[16px] rounded-bl-[16px] w-full h-full px-3 py-2 rounded-lg focus:outline-none" />
                <span className=" flex items-center justify-center rounded-tr-[16px] rounded-br-[16px]  w-[75px] h-[60px]  bg-primary text-white">
                    <SearchIcon fillColor="#fff" /></span>
            </div>
            <div className="mt-4 space-y-[3px]  rounded-[12px] flex-1">
                {contacts?.map((user) => (
                    <div key={user.id} className="bg-white flex items-center p-2 cursor-pointer rounded-[7px] hover:bg-[#fafbff]" onClick={() => onSelectUser(user.id)}>
                        <Image src={user.avatar} alt={user.name} width={40} height={40} className="rounded-[7px] " />
                        <div className="ml-3">
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.message}</p>
                        </div>
                        {user.active && <span className="ml-auto w-2 h-2 bg-green-500 rounded-full"></span>}
                    </div>
                ))}
            </div>
        </div>
    );
}
