import Image from "next/image";

const chatLogs = [
    {
        time: "05:20 pm",
        name: "API Fail",
        message: "Medium",
        avatar: "/images/dashboard/jiny.svg",
        button: 'Download CSV'
    },
    {
        time: "05:20 pm",
        name: "Server Down",
        message: "Low",
        avatar: "/images/dashboard/jiny.svg",
        button: 'Download CSV'
    },
    {
        time: "05:20 pm",
        name: "API Fail",
        message: "Medium",
        avatar: "/images/dashboard/jiny.svg",
        button: 'Download CSV'
    },
    {
        time: "05:20 pm",
        name: "Server Down",
        message: "Low",
        avatar: "/images/dashboard/jiny.svg",
        button: 'Download CSV'
    },

];

export default function ErrorLogs() {
    return (
        <div className="bg-white flex flex-col justify-between w-[60%] p-[20px_17px] h-[348px] rounded-[10px] ">
            <h2 className=" pl-6 font-nunito font-bold text-[#030229] text-base 2xl:text-[18px] leading-[100%] tracking-[0em] mb-4">Live Error logs</h2>

            <div className="w-full mt-[17px] ">
                {/* Table Header */}
                <div className="px-6 grid grid-cols-4 font-nunito font-semibold  text-xs 2xl:text-[14px] leading-[100%] tracking-[0em] text-gray-500  pb-[14px] ">
                    <span className="">Time Stemp</span>
                    <span className="xl:pl-10">Error Type</span>
                    <span className="xl:pl-12 ">Severity</span>
                    <span></span>
                </div>

                {/* Chat Rows */}
                {chatLogs?.map((chat, index) => (
                    <div
                        key={index}
                        className={`grid grid-cols-4  px-6 h-[60px]  items-center ${index != chatLogs.length - 1 ? "border-b border-[#FAFBFF]" : ""}`}
                    >
                        {/* Name & Avatar */}
                        <div className="flex items-center gap-3">
                            <Image src={'/images/dashboard/timer-icon.svg'} alt="clock" width={18} height={18} />
                            <span >{chat.time}</span>
                        </div>

                        {/* Message */}
                        <div className=" xl:pl-10 font-nunito font-normal text-[13px] 2xl:text-[15px] leading-[100%] tracking-[0em] truncate">{chat.name}</div>

                        {/* Time */}
                        <div className=" xl:pl-[52px] flex justify-start items-center gap-2 font-nunito font-semibold text-xs 2xl:text-[13px]  leading-[100%] tracking-[0em] ">

                            <span className="font-nunito text-[#030229] font-normal text-[13px] 2xl:text-[15px] leading-[100%] tracking-[0em]">{chat.message}</span>
                        </div>
                        <div >
                            <span className=" xl:mr-0 bg-primary mx-auto rounded-[4px] flex items-center justify-center text-white w-[73px] h-[25px] font-nunito font-semibold text-[8px] leading-[100%] tracking-[0em] " >
                                Download CSV
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
