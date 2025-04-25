"use client";

import SearchIcon from "@/components/common/search-field/search-icon";
import Image from "next/image";


export interface ChatUser {
    _id: string;
    lastRequest: string;
    lastResponse: string;
    active?: boolean;
    userDetails: {
        username: string;
    };
}

export default function ChatSidebar({
    onSelectUser,
    data,
    isLoading,
}: {
    onSelectUser: (id: string) => void;
    data: ChatUser[];
    isLoading: boolean;
}) {

    return (
        <div className="w-1/3 flex flex-col  ">
            <div className="relative  h-[60px] bg-white   flex items-center   rounded-[16px]">
                <input type="text" placeholder="Search for Users" className="flex-1 rounded-tl-[16px] rounded-bl-[16px] w-full h-full px-3 py-2 rounded-lg focus:outline-none" />
                <span className=" flex items-center justify-center rounded-tr-[16px] rounded-br-[16px]  w-[75px] h-[60px]  bg-primary text-white">
                    <SearchIcon fillColor="#fff" /></span>
            </div>
            {isLoading ? <div className="p-4  space-y-6 flex justify-center items-center overflow-auto  h-[calc(100vh-120px)]">
                <span className="pageLoader"></span>
            </div> : <div className="mt-4 space-y-[3px]  rounded-[12px] flex-1">
                {data && data.length > 0 ? data?.map((user: ChatUser) => (
                    <div key={user._id} className="bg-white flex items-center p-2 cursor-pointer rounded-[7px] hover:bg-[#fafbff]" onClick={() => onSelectUser(user._id)}>
                        <Image src={'/images/avatar.png'} alt={'user picture'} width={35} height={35} className="rounded-[7px] " />
                        <div className="ml-3">
                            <p className="font-semibold">{user.userDetails.username}</p>
                            <p className="text-xs text-gray-500">{user.lastRequest}</p>
                        </div>
                        {user.active && <span className="ml-auto w-2 h-2 bg-green-500 rounded-full"></span>}
                    </div>
                )) : <div className="p-4  space-y-6 flex justify-center items-center overflow-auto  h-[calc(100vh-120px)]">
                    <span className="noData">No users found</span>
                </div>}
            </div>}
        </div>
    );
}
