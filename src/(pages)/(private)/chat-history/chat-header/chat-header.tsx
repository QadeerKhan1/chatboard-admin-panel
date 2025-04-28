"use client";

import Image from "next/image";

export default function ChatHeader({ username }: { username: string }) {
    if (!username) return null; // or a loading UI or fallback

    return (
        <div className="flex items-center p-4 border-b bg-white">
            <Image src={'/images/avatar.png'} alt={'user picture'} width={40} height={40} className="rounded-[7px]" />
            <div className="ml-3">
                <p className="font-semibold">{username}</p>
                <p className="text-xs text-primary">● <span className="text-black">Online</span></p>
            </div>
            {/* <Image src="/images/chat-history/vertically-three-dots.svg" alt="More" width={9} height={29} className="ml-auto" /> */}
        </div>
    );
}
