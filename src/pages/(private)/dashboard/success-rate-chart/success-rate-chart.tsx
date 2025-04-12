"use client";

import { Pie, PieChart, Cell } from "recharts";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const chartData = [
    { name: "Correct Ans", value: 60, color: "#34C759" }, // Green
    { name: "Incorrect Ans", value: 40, color: "#FF3B30CC" }, // Red
];

export default function SuccessRateChart() {
    return (
        <Card className="flex flex-col justify-between p-[20px_17px] w-[30%] border-none shadow-none">
            <CardContent className="flex-1 space-y-[34px] flex flex-col items-center w-full p-0">
                {/* Title */}
                <CardTitle className="text-start font-nunito font-bold text-[#030229] text-base 2xl:text-[18px] leading-[100%] tracking-[0em] w-full">
                    Success Rate Chart
                </CardTitle>

                {/* Pie Chart */}
                <PieChart width={204} height={204}>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90} // Adjusted for 204px width
                        innerRadius={0} // Full pie shape
                        stroke="none" // No stroke
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                            // Positioning the text inside the pie slice
                            const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
                            const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                            const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

                            return (
                                <text
                                    x={x}
                                    y={y}
                                    fill="white"
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    className="text-sm font-semibold"
                                >
                                    {`${(percent * 100).toFixed(0)}%`}
                                </text>
                            );
                        }}
                        labelLine={false} // ✅ Removes the arrow lines
                    >
                        {chartData?.map((entry, index) => (
                            <Cell key={index} fill={entry.color} stroke="none" />
                        ))}
                    </Pie>
                </PieChart>

                {/* Legend */}
                <div className="flex items-center justify-between gap-4">
                    {chartData?.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-sm" style={{ backgroundColor: entry.color }} />
                            <span className="text-gray-600 text-sm">{entry.name}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
