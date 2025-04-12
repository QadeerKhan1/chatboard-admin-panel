"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    TooltipProps,
} from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

// Sample chart data
const chartData = [
    { month: "Jan", value: 40 },
    { month: "Feb", value: 20 },
    { month: "Mar", value: 35 },
    { month: "Apr", value: 25 },
    { month: "May", value: 10 },
    { month: "Jun", value: 80 },
    { month: "Jul", value: 15 },
    { month: "Aug", value: 5 },
    { month: "Sep", value: 20 },
    { month: "Oct", value: 50 },
    { month: "Nov", value: 40 },
    { month: "Dec", value: 45 },
];

// ✅ Strongly typed tooltip props
const CustomTooltip = ({
    active,
    payload,
}: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-semibold">
                {payload[0].value}
            </div>
        );
    }
    return null;
};

// ✅ Strongly typed props for dot renderer
interface HollowDotProps {
    cx?: number;
    cy?: number;
}

const HollowDot = ({ cx = 0, cy = 0 }: HollowDotProps) => {
    return (
        <svg x={cx - 5} y={cy - 5} width={10} height={10} viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4" stroke="#F59E0B" strokeWidth="2" fill="white" />
        </svg>
    );
};

export default function TotalQueriesChart() {
    return (
        <Card className="w-[70%] h-[348px] p-[20px_17px] border-none shadow-none">
            <CardContent className="space-y-[18px]">
                <CardTitle className="flex items-center justify-between">
                    <span className="text-start font-nunito font-bold text-[#030229] text-base 2xl:text-[18px] leading-[100%] tracking-[0em] w-full">
                        Total Queries
                    </span>

                    <Select>
                        <SelectTrigger className="w-[135px] h-[36px] border border-[#EFF0F6] rounded px-3 text-black text-opacity-70 shadow-none font-inter font-medium text-[14.48px] leading-[18.1px] tracking-[-0.27px] focus:outline-none focus:ring-1 focus:ring-gray-500">
                            <SelectValue placeholder="Year 2021" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2021">Yearly 2021</SelectItem>
                            <SelectItem value="2022">Yearly 2022</SelectItem>
                            <SelectItem value="2023">Yearly 2023</SelectItem>
                            <SelectItem value="2024">Yearly 2024</SelectItem>
                        </SelectContent>
                    </Select>
                </CardTitle>

                <ResponsiveContainer width="100%" height={258}>
                    <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" tick={{ fill: "#888" }} axisLine={false} tickLine={false} />
                        <YAxis
                            domain={[0, 100]}
                            tick={{ fill: "#888" }}
                            axisLine={false}
                            tickLine={false}
                            tickMargin={20}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={false} />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#F59E0B"
                            strokeWidth={3}
                            dot={<HollowDot />}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
