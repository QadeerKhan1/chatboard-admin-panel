"use client";

import { LabelList, RadialBar, RadialBarChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
    { name: "Uptime", value: 80, fill: "#FFD66B" },
    { name: "Response Time", value: 60, fill: "#FF6B6B" },
    { name: "Last Downtime", value: 40, fill: "#A55EEA" },
];

const chartConfig = {
    uptime: { label: "Uptime", color: "#FFD66B" },
    responseTime: { label: "Response Time", color: "#FF6B6B" },
    lastDowntime: { label: "Last Downtime", color: "#A55EEA" },
} satisfies ChartConfig;

export function ServerStatusCharts({ uptime = 80, responseTime = 120, downtime = "2h ago" }) {
    return (
        <div className="flex p-[20px_17px] h-[348px] bg-white rounded-lg  w-[50%] ">
            {/* Sidebar Section - Now on the LEFT */}
            <div className="space-y-7 w-[200px] ">
                <div className="flex items-center gap-2">
                    <span className="font-nunito font-bold text-[#030229] text-base 2xl:text-[18px] leading-[100%] tracking-[0em] ">Server Status</span>
                    <span className="text-primary">● <span className="text-[#030229]">Active</span></span>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-4  bg-yellow-400 rounded-[3px] "></span>
                        <span className="font-nunito font-semibold text-[13px] leading-[100%] tracking-[0em] text-[#030229]">Uptime Percentage</span>
                    </div>
                    <p className="font-nunito font-bold text-sm 2xl:text-[16px] leading-[100%] tracking-[0em]">{uptime}%</p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-4 bg-red-400 rounded-[3px] "></span>
                        <span className="font-nunito font-semibold text-[13px] leading-[100%] tracking-[0em] text-[#030229]">Response Time</span>
                    </div>
                    <p className="font-nunito font-bold text-sm 2xl:text-[16px] leading-[100%] tracking-[0em]">{responseTime}ms</p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-4  bg-purple-500 rounded-[3px] "></span>
                        <span className="font-nunito font-semibold text-[13px] leading-[100%] tracking-[0em] text-[#030229]">Last Downtime</span>
                    </div>
                    <p className="font-nunito font-bold text-sm 2xl:text-[16px] leading-[100%] tracking-[0em]">{downtime}</p>
                </div>
            </div>

            {/* Chart Section - Now on the RIGHT */}
            <div className="w-[50%]">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square ">
                    <RadialBarChart width={200} height={200} cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={15} data={chartData}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="name" />} />
                        <RadialBar dataKey="value" background cornerRadius={5} />
                        <LabelList dataKey="name" position="inside" className="fill-white font-bold text-lg" />
                    </RadialBarChart>
                </ChartContainer>
            </div>
        </div >
    );
}