"use client";

import { PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

type UserEngagementProps = {
    userEngagement?: {
        newUsers: number;
        oldUsers: number;
    };
};

export default function UserEngagementChart({ userEngagement }: UserEngagementProps) {
    const newUsers = userEngagement?.newUsers ?? 0;
    const oldUsers = userEngagement?.oldUsers ?? 0;
    const totalUsers = newUsers + oldUsers;

    // Safely calculate the percentages
    const oldUsersPercent = totalUsers > 0 ? Math.round((oldUsers / totalUsers) * 100) : 0;
    const newUsersPercent = totalUsers > 0 ? 100 - oldUsersPercent : 0;

    // Edge case when both newUsers and oldUsers are zero
    if (totalUsers === 0) {
        return (
            <Card className="flex flex-col gap-0 lg:gap-5 justify-between w-[30%] bg-white shadow-none lg:p-6 border-none h-[348px]">
                <CardHeader className="p-4 lg:p-0">
                    <CardTitle className="text-start font-nunito font-bold text-[#030229] text-base 2xl:text-[18px] leading-[100%] tracking-[0em] w-full">
                        User Engagement
                    </CardTitle>
                </CardHeader>

                <CardContent className="relative flex items-center justify-center w-full ">
                    <div className="absolute inset-0 flex items-center justify-center mt-[-15px]">
                        <Image
                            width={65}
                            height={65}
                            src="/images/dashboard/engagement-user.svg"
                            alt="User Avatar"
                            className="rounded-full object-cover"
                        />
                    </div>
                </CardContent>

                <div className="flex flex-col lg:flex-row items-center gap-[10px] lg:justify-between w-full pb-4 px-4 lg:px-6 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 bg-[#5B93FF] rounded-sm"></span>
                        <span className="font-nunito font-semibold text-xs 2xl:text-[14px] leading-[100%] tracking-[0em] text-[#030229]">
                            New Users 0%
                        </span>
                    </div>
                    <div className="flex items-center gap-2 -ml-[5px]">
                        <span className="w-4 h-4 bg-[#FACC15] rounded-sm"></span>
                        <span className="font-nunito font-semibold text-xs 2xl:text-[14px] leading-[100%] tracking-[0em] text-[#030229]">
                            Old Users 0%
                        </span>
                    </div>
                </div>
            </Card>
        );
    }

    const data = [
        { name: "Old Users", value: oldUsersPercent, color: "#FACC15" },
        { name: "New Users", value: newUsersPercent, color: "#5B93FF" },
    ];

    return (
        <Card className="flex flex-col gap-0 lg:gap-5 justify-between w-[30%] bg-white shadow-none lg:p-6 border-none h-[348px]">
            <CardHeader className="p-4 lg:p-0">
                <CardTitle className="text-start font-nunito font-bold text-[#030229] text-base 2xl:text-[18px] leading-[100%] tracking-[0em] w-full">
                    User Engagement
                </CardTitle>
            </CardHeader>

            <CardContent className="relative flex items-center justify-center w-full ">
                <PieChart width={180} height={180}>
                    <defs>
                        <filter id="yellowShadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feDropShadow dx="0" dy="3.91" stdDeviation="3.91" floodColor="#FFD66B" floodOpacity="0.5" />
                        </filter>
                    </defs>

                    <Pie
                        data={[data[0]]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        startAngle={90}
                        endAngle={-270}
                        stroke="none"
                        dataKey="value"
                    >
                        <Cell fill={data[0].color} filter="url(#yellowShadow)" />
                    </Pie>

                    <Pie
                        data={[data[1]]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        startAngle={90}
                        endAngle={(90 - (360 * data[1].value) / 100) % 360}
                        stroke="none"
                        dataKey="value"
                        cornerRadius={50}
                    >
                        <Cell fill={data[1].color} />
                    </Pie>
                </PieChart>

                <div className="absolute inset-0 flex items-center justify-center mt-[-15px]">
                    <Image
                        width={65}
                        height={65}
                        src="/images/dashboard/engagement-user.svg"
                        alt="User Avatar"
                        className="rounded-full object-cover"
                    />
                </div>
            </CardContent>

            <div className="flex flex-col lg:flex-row items-center gap-[10px] lg:justify-between w-full pb-4 px-4 lg:px-6 text-sm">
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-[#5B93FF] rounded-sm"></span>
                    <span className="font-nunito font-semibold text-xs 2xl:text-[14px] leading-[100%] tracking-[0em] text-[#030229]">
                        New Users {newUsersPercent}%
                    </span>
                </div>
                <div className="flex items-center gap-2 -ml-[5px]">
                    <span className="w-4 h-4 bg-[#FACC15] rounded-sm"></span>
                    <span className="font-nunito font-semibold text-xs 2xl:text-[14px] leading-[100%] tracking-[0em] text-[#030229]">
                        Old Users {oldUsersPercent}%
                    </span>
                </div>
            </div>
        </Card>
    );
}
