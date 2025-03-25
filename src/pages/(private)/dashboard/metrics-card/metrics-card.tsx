import { HelpCircle, Users, Star, Award } from "lucide-react";
import SingleMetricCard from "./signle-metric-card";


const METRICS = [
    {
        iconUrl: '/images/dashboard/total-query.svg',
        value: "178+",
        label: "Total Queries",
        textColor: "text-orange-500",
    },
    {
        iconUrl: '/images/dashboard/active-user.svg',
        value: "213k",
        label: "Active Users",
        textColor: "text-blue-600",
    },
    {
        iconUrl: "/images/dashboard/success-rate.svg",
        value: "85% (positive)",
        label: "Success Rate",
        textColor: "text-yellow-600",
    },
    {
        iconUrl: "/images/dashboard/system-health.svg",
        value: "99% (correct)",
        label: "System Health",
        textColor: "text-green-600",
    },
];

export default function MetricsCard() {
    return (
        <div className="flex justify-between items-center p-[55px_39px]  bg-white  shadow-sm rounded-lg">
            {METRICS.map((metric, index) => (
                <SingleMetricCard {...metric} />
            ))}
        </div>
    );
}
