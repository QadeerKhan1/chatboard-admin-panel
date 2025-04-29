"use client";
export default function ChatMessages({
    messages = [],
    messageLoading
}: {
    messages: { request: string; response: string, }[];
    messageLoading?: boolean;
}) {
    if (messageLoading) {
        return (
            <div className="p-4 bg-white space-y-6 flex justify-center items-center overflow-auto  h-[calc(100vh-120px)]">
                <span className="pageLoader"></span>
            </div>
        )
    }
    return (
        <div className="p-4 space-y-6 overflow-auto bg-white h-[calc(100vh-120px)]">
            {messages.length > 0 ? messages?.map((msg, index) => (
                <div key={index} className="space-y-2">
                    {/* User Message (left) */}
                    <div className="flex items-start gap-2">
                        {/* Optional avatar */}
                        {/* <Image src="/user-avatar.png" width={32} height={32} alt="user" className="rounded-full" /> */}
                        <div className="bg-gray-100 text-black px-[14px] py-[6px] rounded-xl max-w-[75%] text-xs 2xl:text-sm">
                            {msg.request}
                        </div>
                    </div>

                    {/* AI Message (right) */}
                    <div className="flex justify-end gap-2 items-start">
                        <div className="bg-primary text-white px-[14px] py-[6px] rounded-xl max-w-[75%] text-xs 2xl:text-sm">
                            {msg.response}
                        </div>
                        {/* Optional AI avatar */}
                        {/* <Image src="/ai-avatar.png" width={32} height={32} alt="ai" className="rounded-full" /> */}
                    </div>
                </div>
            )) : (
                <div className="p-4 bg-white space-y-6 flex justify-center items-center overflow-auto  h-[calc(100vh-120px)]">
                    <h1 className="text-2xl font-semibold">No Messages Found</h1>
                </div>)}
        </div>
    );
}
