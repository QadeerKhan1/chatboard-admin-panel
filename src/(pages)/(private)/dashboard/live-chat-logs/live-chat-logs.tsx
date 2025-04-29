import Image from "next/image";

type ChatLogProps = {
    chatLogs: {
        user: string;
        response: string;
        createdAt: string;
    }[];
};

export default function ChatLog({ chatLogs }: ChatLogProps) {

    return (
        <div className="bg-white w-[70%] flex flex-col justify-between space-y-4 p-[16px_12px] xl:p-5 rounded-[10px] h-[348px] ">
            <h2 className="font-nunito font-bold text-[#030229] text-base 2xl:text-[18px] leading-[100%] tracking-[0em] mb-4">
                Live Chat Logs
            </h2>

            <div className="w-full">
                {/* Table Header */}
                <div className="grid grid-cols-3 font-nunito font-semibold text-xs 2xl:text-[14px] leading-[100%] tracking-[0em] text-gray-500 pb-[14px]">
                    <span>Name</span>
                    <span className="xl:pl-14">Last Message</span>
                    <span className="flex justify-end pr-[76px]">Time</span>
                </div>

                {/* Chat Rows */}
                <div className="h-[240px] overflow-y-scroll">
                    {chatLogs.length > 0 ? chatLogs?.map((chat, index) => {
                        const time = new Date(chat.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        });

                        return (
                            <div
                                key={index}
                                className={`grid grid-cols-3 h-[60px] items-center ${index !== chatLogs.length - 1 ? "border-b border-[#FAFBFF]" : ""}`}
                            >
                                {/* Name & Avatar */}
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/images/avatar.png"
                                        alt="Jenny Wilson"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="font-nunito text-[#030229] font-normal text-[13px] 2xl:text-[15px] leading-[100%] tracking-[0em]">
                                        {chat.user}
                                    </span>
                                </div>

                                {/* Message */}
                                <span className="xl:pl-14 font-nunito font-normal text-[13px] 2xl:text-[15px] leading-[100%] tracking-[0em] truncate">
                                    {chat.response}
                                </span>

                                {/* Time */}
                                <div className="flex justify-end pr-7 items-center gap-2 font-nunito font-semibold text-xs 2xl:text-[13px] leading-[100%] tracking-[0em]">
                                    <Image
                                        src={"/images/dashboard/timer-icon.svg"}
                                        alt="clock"
                                        width={18}
                                        height={18}
                                    />
                                    <span>{time}</span>
                                </div>
                            </div>
                        );
                    }) : (
                        <div className="w-full h-full flex justify-center items-center ">
                            <span className="font-nunito text-[#030229] font-semibold text-[16px] 2xl:text-[15px] leading-[100%] tracking-[0em]">
                                No logs found
                            </span>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
}
