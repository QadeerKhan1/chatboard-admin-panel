"use client";

import SearchField from "@/components/common/search-field/search-field";

export default function ManagementHeader({ activeTab, setActiveTab , setSearchQuery }: {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    setSearchQuery: (query: string) => void
}) {


    return (
        <div className="flex items-center justify-between h-[60px] w-full pr-[5px]">
            {/* Tab Buttons */}
            <div className="w-[241px]">
                <button
                    onClick={() => setActiveTab("new")}
                    className={`flex-1 text-center py-2 font-bold transition relative
                        ${activeTab === "new" ? "text-[#8E92BC]" : "text-[#8E92BC]"}
                        font-[Nunito] text-[20px] font-semibold leading-[150%] tracking-[-0.02em]`}
                >
                    Users
                    {/* {activeTab === "new" && <div className="h-[2px] bg-[#34C759] w-full absolute bottom-0 left-0" />} */}
                </button>

                {/* <button
                    onClick={() => setActiveTab("blocked")}
                    className={`flex-1 text-center py-2 font-bold transition relative
                        ${activeTab === "blocked" ? "text-[#34C759]" : "text-[#8E92BC]"}
                        font-[Nunito] text-[16.68px] leading-[150%] tracking-[-0.02em]`}
                >
                    Blocked User
                    {activeTab === "blocked" && <div className="h-[2px] bg-[#34C759] w-full absolute bottom-0 left-0" />}
                </button> */}
            </div>
            <SearchField onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for " />

        </div>
    );
}
