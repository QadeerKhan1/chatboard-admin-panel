"use client";

import Image from "next/image";
import { useState } from "react";

export default function ChatInput({ onSend }: { onSend: (message: string) => void }) {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim() !== "") {
            onSend(message);
            setMessage("");
        }
    };

    return (
        <div className="p-4  flex items-center gap-[22px] px-[22px] bg-white">
            <Image src={"/images/chat-history/upload-file-option.svg"} alt="Send" width={14} height={18} className="cursor-pointer" onClick={handleSend} />
            <div className="flex items-center h-[45px] px-[13px] w-full border-[2px] border-[#E2E8F0] p-2  rounded-[12px] ">
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" className="flex-1 focus:outline-none" />
                <Image src={"/images/chat-history/upload-message.svg"} alt="Send" width={18} height={18} className="ml-2 cursor-pointer" onClick={handleSend} />
            </div>
            <Image src={"/images/chat-history/upload-audio.svg"} alt="Send" width={28} height={30} className="cursor-pointer" onClick={handleSend} />
        </div>
    );
}
