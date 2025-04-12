"use client";

import { PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

// Dynamic values ensuring the sum does not exceed 100%
const oldUsersValue = 80; // You can change this
const newUsersValue = 100 - oldUsersValue; // Ensures total is 100%

const data = [
    { name: "Old Users", value: oldUsersValue, color: "#FACC15" }, // Yellow (Base)
    { name: "New Users", value: newUsersValue, color: "#5B93FF" }, // Blue (Above)
];

export default function UserEngagementChart() {
    return (
        <Card className="flex flex-col gap-5 justify-between w-[30%] bg-white shadow-none p-6 border-none h-[348px]">
            <CardHeader className="p-0">
                <CardTitle className="text-start font-nunito font-bold text-[#030229] text-base 2xl:text-[18px] leading-[100%] tracking-[0em] w-full">User Engagement</CardTitle>
            </CardHeader>

            <CardContent className="relative flex items-center justify-center">
                <PieChart width={180} height={180}> {/* Decreased size */}
                    <defs>
                        {/* Shadow Filter for Yellow */}
                        <filter id="yellowShadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feDropShadow dx="0" dy="3.91" stdDeviation="3.91" floodColor="#FFD66B" floodOpacity="0.5" />
                        </filter>
                    </defs>

                    {/* Bottom Layer (Yellow) */}
                    <Pie
                        data={[data[0]]} // Only Yellow
                        cx="50%"
                        cy="50%"
                        innerRadius={60} // Increased thickness
                        outerRadius={90} // Increased thickness
                        startAngle={90}
                        endAngle={-270}
                        stroke="none"
                        dataKey="value"
                    >
                        <Cell fill={data[0].color} filter="url(#yellowShadow)" />
                    </Pie>

                    {/* Top Layer (Blue) */}
                    <Pie
                        data={[data[1]]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60} // Increased thickness
                        outerRadius={90} // Increased thickness
                        startAngle={90}
                        endAngle={(90 - (360 * data[1].value) / 100) % 360}
                        stroke="none"
                        dataKey="value"
                        cornerRadius={50} // ✅ Move here
                    >
                        <Cell fill={data[1].color} />
                    </Pie>

                </PieChart>

                {/* Center Image */}
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

            {/* Legend */}
            <div className="flex items-center justify-between w-full px-6 text-sm">
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-[#5B93FF] rounded-sm"></span>
                    <span className="text-gray-600">New Users {newUsersValue}%</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-[#FACC15] rounded-sm"></span>
                    <span className="text-gray-600">Old Users {oldUsersValue}%</span>
                </div>
            </div>
        </Card>
    );
}
