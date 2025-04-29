import Image from "next/image";

type ErrorLogItem = {
    timestamp: string;
    errorType: string;
    severity: string;
    message: string;
};

type ErrorLogsProps = {
    logs: ErrorLogItem[];
};

export default function ErrorLogs({ logs }: ErrorLogsProps) {
    return (
        <div className="bg-white flex flex-col justify-between w-[60%] p-4 xl:p-5 h-[348px] rounded-[10px]">
            <h2 className=" font-nunito font-bold text-[#030229] text-base 2xl:text-[18px] leading-[100%] tracking-[0em] mb-4">
                Error Logs
            </h2>

            <div className="w-full mt-[17px]">
                {/* Table Header */}
                <div className="grid grid-cols-4 font-nunito font-semibold text-xs 2xl:text-[14px] text-gray-500 pb-[14px]">
                    <span>Time Stamp</span>
                    <span className="xl:pl-10">Error Type</span>
                    <span className="xl:pl-12">Severity</span>
                    <span></span>
                </div>

                {/* Error Rows */}
                <div className="h-[240px] overflow-y-scroll">
                    {logs.length > 0 ? logs?.map((log, index) => {
                        const formattedTime = new Date(log.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        });

                        return (
                            <div
                                key={index}
                                className={`grid grid-cols-4 h-[60px] items-center ${index !== logs.length - 1 ? "border-b border-[#FAFBFF]" : ""
                                    }`}
                            >
                                {/* Timestamp */}
                                <div className="flex items-center gap-3">
                                    <Image src="/images/dashboard/timer-icon.svg" alt="clock" width={18} height={18} />
                                    <span className="font-nunito font-semibold text-[10px] xl:text-[12px]">
                                        {formattedTime}
                                    </span>
                                </div>

                                {/* Error Type */}
                                <div className="xl:pl-10 font-nunito font-normal text-[12px] 2xl:text-[14px] truncate">
                                    {log.errorType}
                                </div>

                                {/* Severity */}
                                <div className="xl:pl-[52px] font-nunito text-[#030229] font-normal text-[12px] 2xl:text-[14px]">
                                    {log.severity}
                                </div>

                                {/* Download Button */}
                                <div>
                                    <span className="bg-primary text-white rounded-[4px] flex items-center justify-center w-[73px] h-[25px] font-nunito font-semibold text-[8px]">
                                        Download CSV
                                    </span>
                                </div>
                            </div>
                        );
                    }) : (
                        <div className="w-full h-full flex justify-center items-center ">
                            <span className="font-nunito text-[#030229] font-semibold text-[16px] 2xl:text-[15px] leading-[100%] tracking-[0em]">
                                No logs found
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
