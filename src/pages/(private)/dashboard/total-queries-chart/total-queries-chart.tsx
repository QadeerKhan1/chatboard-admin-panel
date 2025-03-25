"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const chartData = [
    { month: "Jan", value: 40 },
    { month: "Feb", value: 20 },
    { month: "Mar", value: 35 },
    { month: "Apr", value: 25 },
    { month: "May", value: 10 },
    { month: "Jun", value: 80 }, // Peak
    { month: "Jul", value: 15 },
    { month: "Aug", value: 5 },
    { month: "Sep", value: 20 },
    { month: "Oct", value: 50 },
    { month: "Nov", value: 40 },
    { month: "Dec", value: 45 },
];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-semibold">
                {payload[0].value}
            </div>
        );
    }
    return null;
};

// Custom Dot Component with a Hollow Effect
const HollowDot = (props: any) => {
    const { cx, cy } = props;
    return (
        <svg x={cx - 5} y={cy - 5} width={10} height={10} viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4" stroke="#F59E0B" strokeWidth="2" fill="white" />
        </svg>
    );
};

export function TotalQueriesChart() {
    return (
        <Card className="w-[70%]">
            <CardContent className="p-4">
                <CardTitle className="text-gray-700 text-lg mb-4">Total Queries</CardTitle>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" tick={{ fill: "#888" }} axisLine={false} tickLine={false} />
                        <YAxis domain={[0, 100]} tick={{ fill: "#888" }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} cursor={false} /> {/* Removed vertical line */}

                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#F59E0B" // Orange color
                            strokeWidth={3}
                            dot={<HollowDot />} // Hollow circle for dots
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
