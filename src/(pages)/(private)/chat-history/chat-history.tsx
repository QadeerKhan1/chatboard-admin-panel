"use client";
import ChatSidebar, { ChatUser } from "./chat-sidebar/chat-sidebar";
import ChatHeader from "./chat-header/chat-header";
import ChatMessages from "./chat-message/chat-message";
import { useGetChatMessagesQuery, useGetChatUserListQuery } from "@/store/chat-history/chat-history-slice";
import React, { useEffect, useState } from "react";
import Image from "next/image";


export default function ChatApp() {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = React.useState('');
    

    // Fetch chat user list with pagination
    const { data: response, isLoading } = useGetChatUserListQuery(
        {  search: searchQuery },
      );
      
    const usersData = response?.data?.data || [];

    useEffect(()=>{
        setSelectedUserId(usersData[0]?._id)    
    } ,[usersData ,isLoading])



    // Fetch messages for selected user
    const {
        data: messageResponse,
        isLoading: messageLoading,
    } = useGetChatMessagesQuery({ conversationId: selectedUserId, page: 1, limit: 50 }, { skip: !selectedUserId });

    const messagesList = messageResponse?.data?.data || [];
   

    

    const handleUserSelect = (id: string) => {
        setSelectedUserId(id);
    };

    // if (usersData.length === 0 && !isLoading) {
    //     return (<DataNotFound title='No Chats Yet' description='Start a conversation and make a' description2='new connection!' />)

    // }

    return (
        <div className="flex gap-[30px] h-[calc(100vh-120px)]">
            {/* Sidebar with pagination and user list */}
            <ChatSidebar  setSearchQuery={setSearchQuery} isLoading={isLoading} data={usersData as ChatUser[]} onSelectUser={handleUserSelect} />

            <div className="flex flex-col flex-1">
                <ChatHeader username={messageResponse?.data?.data[0].user.username || null} />
                {selectedUserId ? (
                    <ChatMessages messages={messagesList} messageLoading={messageLoading} />
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center bg-white text-gray-600 rounded-md shadow-inner px-6 py-10">
                        <Image
                            width={130}
                            height={130}
                            src="/images/no-chat-found.svg"
                            alt="No conversation selected"
                            className=" mb-6 "
                        />
                        <h2 className="text-xl font-semibold mb-2">No Chat Selected</h2>
                        <p className="text-sm text-center max-w-sm">
                            Select a user conversation from the list to review messages or monitor chat activity.                        </p>
                    </div>

                )}
            </div>

            {/* Pagination Controls (optional location/UI)
            <div className="absolute bottom-5 left-5 flex gap-2">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div> */}
        </div>
    );
}
