import { Clock } from "lucide-react";
import Image from "next/image";

const chatLogs = [
    {
        name: "Jenny Wilson",
        message: "“Booking details please”",
        time: "05:20 pm",
        avatar: "/images/dashboard/jiny.svg",
    },
    {
        name: "Savannah Nguyen",
        message: "How can I cancel my appointment?",
        time: "05:20 pm",
        avatar: "/images/dashboard/jiny.svg",
    },
    {
        name: "Jerome Bell",
        message: "Issue with subscription",
        time: "05:20 pm",
        avatar: "/images/dashboard/jiny.svg",
    },
    {
        name: "Ralph Edwards",
        message: "Thanks for the help",
        time: "05:20 pm",
        avatar: "/images/dashboard/jiny.svg",
    },
];

export default function ChatLog() {
    return (
        <div className="bg-white w-[70%] py-6 rounded-[10px] ">
            <h2 className=" pl-6 font-nunito font-bold text-[#030229] text-base 2xl:text-[18px] leading-[100%] tracking-[0em] mb-4">Live Chat Logs</h2>

            <div className="w-full py-6">
                {/* Table Header */}
                <div className="px-6 grid grid-cols-3 font-nunito font-semibold  text-xs 2xl:text-[14px] leading-[100%] tracking-[0em] text-gray-500  pb-[16px] ">
                    <span>Name</span>
                    <span>Last Message</span>
                    <span className="flex justify-end pr-[100px] ">Time</span>
                </div>

                {/* Chat Rows */}
                {chatLogs.map((chat, index) => (
                    <div
                        key={index}
                        className={`grid grid-cols-3 px-6 h-[68px]  items-center ${index != chatLogs.length - 1 ? "border-b border-[#FAFBFF]" : ""}`}
                    >
                        {/* Name & Avatar */}
                        <div className="flex items-center gap-3">
                            <img
                                src={chat.avatar}
                                alt={chat.name}
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="font-nunito text-[#030229] font-normal text-[13px] 2xl:text-[15px] leading-[100%] tracking-[0em]">{chat.name}</span>
                        </div>

                        {/* Message */}
                        <span className="font-nunito font-normal text-[13px] 2xl:text-[15px] leading-[100%] tracking-[0em] truncate">{chat.message}</span>

                        {/* Time */}
                        <div className="flex justify-end pr-14 items-center gap-2 font-nunito font-semibold text-xs 2xl:text-[13px]  leading-[100%] tracking-[0em] ">
                            <Image src={'/images/dashboard/timer-icon.svg'} alt="clock" width={18} height={18} />
                            <span >{chat.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
