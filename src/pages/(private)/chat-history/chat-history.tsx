"use client";

import { useState } from "react";
import ChatSidebar from "./chat-sidebar/chat-sidebar";
import ChatHeader from "./chat-header/chat-header";
import ChatMessages from "./chat-message/chat-message";
import ChatInput from "./chat-input/chat-input";


const user = { name: "Esther Howard", avatar: '/images/marvin.svg' };

export default function ChatApp() {
    const [messages, setMessages] = useState([
        { sender: "other", text: "Hi! I’m having trouble sending messages. Can you help?" },
        { sender: "user", text: "Hello! Sure, I’d be happy to assist. Can you describe the issue?" },
        { sender: "other", text: "Yes, my messages aren’t delivering to my contacts." },
        { sender: "user", text: "Got it! Please check your internet connection and try restarting the app. Let me know if the issue persists." },
        { sender: "other", text: "I tried that, but it’s still not working." },
        { sender: "user", text: "Thanks for your patience! We’ll check your account. Meanwhile, can you try logging out and back in?" },
        { sender: "other", text: "Okay, I’ll do that now." },
        { sender: "other", text: "It’s working now! Thank you so much!" },
        { sender: "user", text: "Great! 😊 Let us know if you need any more help. Happy chatting!" },
    ]);

    const handleSendMessage = (message: string) => {
        setMessages([...messages, { sender: "user", text: message }]);
    };

    return (
        <div className="flex gap-[30px] h-[calc(100vh-120px)]  ">
            <ChatSidebar onSelectUser={() => { }} />
            <div className="flex flex-col flex-1 ">
                <ChatHeader user={user} />
                <ChatMessages messages={messages} />
                {/* <ChatInput onSend={handleSendMessage} /> */}
            </div>
        </div>
    );
}
