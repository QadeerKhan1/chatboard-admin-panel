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
import { ActivityItem } from "@/interface/link-icon-props";

// Mapping of month numbers to month names
const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// Function to transform API data into chart data format
const transformChartData = (apiData: { month: number, year: number, totalQueries: number }[]) => {
    return monthNames.map((monthName, index) => {
        const monthData = apiData.find(item => item.month === index + 1);
        return {
            month: monthName,  // Use month name
            value: monthData ? monthData.totalQueries : 0,  // Use totalQueries if available, else 0
        };
    });
};

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


interface TotalQueriesChartProps {
    onYearChange: (year: string) => void;
    selectedYear: string;
    data: ActivityItem[]; // API data structure
}

export default function TotalQueriesChart({ onYearChange, selectedYear, data = [] }: TotalQueriesChartProps) {
    // Transform the API data into chartData format
    const chartData = transformChartData(data);

    return (
        <Card className="w-[70%] h-[348px] p-[16px_0px] 2xl:p-[20px_17px] border-none shadow-none">
            <CardContent className="space-y-[18px]">
                <CardTitle className="flex items-center justify-between">
                    <span className="text-start font-nunito font-bold text-[#030229] text-base 2xl:text-[18px] leading-[100%] tracking-[0em] w-full">
                        Total Queries
                    </span>

                    <Select value={selectedYear} onValueChange={onYearChange}>
                        <SelectTrigger className="w-[135px] h-[36px] border border-[#EFF0F6] rounded px-3 text-black text-opacity-70 shadow-none font-inter font-medium text-[14.48px] leading-[18.1px] tracking-[-0.27px] focus:outline-none focus:ring-1 focus:ring-gray-500">
                            <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent>
                            {["2021", "2022", "2023", "2024"].map((year) => (
                                <SelectItem key={year} value={year}>Yearly {year}</SelectItem>
                            ))}
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
