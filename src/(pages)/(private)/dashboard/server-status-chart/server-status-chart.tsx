"use client";

import { LabelList, RadialBar, RadialBarChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PolarAngleAxis } from "recharts";

const chartConfig = {
    uptime: { label: "Uptime", color: "#FFD66B" },
    responseTime: { label: "Response Time", color: "#FF6B6B" },
    lastDowntime: { label: "Last Downtime", color: "#A55EEA" },
} satisfies ChartConfig;

export default function ServerStatusCharts({ uptime = 80, responseTime = 120, downtime = "2h ago" }) {
    // Normalize values for chart visuals (especially if responseTime is in ms)
    const normalizedResponse = Math.min(responseTime / 2, 100);
    const uptimePercentage = Math.floor(uptime)

    const chartData = [
        { name: "Uptime", value: uptimePercentage, fill: "#FFD66B" },
        { name: "Response Time", value: normalizedResponse, fill: "#FB896B" },
        { name: "Last Downtime", value: 40, fill: "#6A57E5" },
    ];


    return (
        <div className="flex flex-col p-4 xl:p-5 h-[348px] bg-white rounded-lg w-[50%]">
            {/* Header */}
            <div className="flex items-center gap-2">
                <span className="font-nunito font-bold text-[#030229] text-base 2xl:text-[18px]">Server Status</span>
                <span className="text-primary">● <span className="text-[#030229]">Active</span></span>
            </div>

            {/* Content */}
            <div className="flex items-center justify-between space-y-7">
                {/* Left Side Stats */}
                <div className="space-y-7">
                    {/* Uptime */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-4 bg-[#FFD66B] rounded-[3px]" />
                            <span className="font-nunito font-semibold text-xs 2xl:text-sm text-[#030229]">Uptime Percentage</span>
                        </div>
                        <p className="font-nunito font-bold text-sm 2xl:text-[16px]">{uptimePercentage}%</p>
                    </div>

                    {/* Response Time */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-4 bg-[#FB896B] rounded-[3px]" />
                            <span className="font-nunito font-semibold text-xs 2xl:text-[14px] text-[#030229]">Response Time</span>
                        </div>
                        <p className="font-nunito font-bold text-sm 2xl:text-[16px]">{responseTime}ms</p>
                    </div>

                    {/* Last Downtime */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-4 bg-[#6A57E5] rounded-[3px]" />
                            <span className="font-nunito font-semibold text-xs 2xl:text-[14px] text-[#030229]">Last Downtime</span>
                        </div>
                        <p className="font-nunito font-bold text-sm 2xl:text-[16px]">{downtime}</p>
                    </div>
                </div>

                {/* Radial Chart */}
                <div className="w-full lg:w-[50%]">
                    <ChartContainer config={chartConfig} className="mx-auto aspect-square">
                        <RadialBarChart
                            width={200}
                            height={200}
                            cx="50%"
                            cy="50%"
                            innerRadius="40%"
                            outerRadius="100%"
                            barSize={15}
                            data={chartData}
                        >
                            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="name" />} />
                            <RadialBar dataKey="value" background cornerRadius={5} />
                            <LabelList dataKey="name" position="inside" className="fill-white font-bold text-lg" />
                        </RadialBarChart>

                    </ChartContainer>
                </div>
            </div>
        </div>
    );
}
