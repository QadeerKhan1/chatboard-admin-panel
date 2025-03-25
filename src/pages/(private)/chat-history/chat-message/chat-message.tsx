"use client";

export default function ChatMessages({ messages }: { messages: { sender: string; text: string }[] }) {
    return (
        <div className="h-[400px] p-4  overflow-auto bg-white">
            {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-2`}>
                    <div className={`px-4 py-2 rounded-lg max-w-xs ${msg.sender === "user" ? "bg-primary text-white" : "bg-gray-200 text-gray-700"}`}>
                        {msg.text}
                    </div>
                </div>
            ))}
        </div>
    );
}
