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
    setSearchQuery,
}: {
    onSelectUser: (id: string) => void;
    data: ChatUser[];
    isLoading: boolean;
    setSearchQuery: (query: string) => void;
}) {

    return (
        <div className="w-1/3 flex flex-col  ">
            <div className="relative  h-[60px] bg-white   flex items-center   rounded-[16px]">
                <input onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search for Users" className="flex-1 rounded-tl-[16px] text-[#1E265E] text-[12px] 2xl:text-[14px]  rounded-bl-[16px] w-full h-full px-3 py-2 rounded-lg focus:outline-none" />
                <span className=" flex items-center justify-center rounded-tr-[16px] rounded-br-[16px]  w-[75px] h-[60px]  bg-primary text-white">
                    <SearchIcon fillColor="#fff" /></span>
            </div>
            {isLoading ? <div className="p-4  space-y-6 flex justify-center items-center overflow-auto  h-[calc(100vh-120px)]">
                <span className="pageLoader"></span>
            </div> : <div className="mt-4 space-y-[3px]  rounded-[12px] flex-1">
                {data && data.length > 0 ? data?.map((user: ChatUser) => (
                    <div key={user._id} className="bg-white h-[72px] flex items-center p-2 cursor-pointer rounded-[10px] hover:bg-[#B7B7B71A]" onClick={() => onSelectUser(user._id)}>
                        <Image src={'/images/avatar.png'} alt={'user picture'} width={35} height={35} className="rounded-[7px] " />
                        <div className="ml-3">
                            <p className="font-semibold text-sm 2xl:text-base text-[#030229]">{user.userDetails.username}</p>
                            <p className="text-[12px] text-[#76767CCC]">{user.lastRequest}</p>
                        </div>
                        {user.active && <span className="ml-auto w-2 h-2 bg-green-500 rounded-full"></span>}
                    </div>
                )) : <div className="p-4  space-y-6 flex justify-center items-center overflow-auto  h-[calc(100vh-120px)]">
                    <span className="noData">No chat found</span>
                </div>}
            </div>}
        </div>
    );
}
