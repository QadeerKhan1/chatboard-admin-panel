import SingleMetricCard from "./signle-metric-card";

interface MetricData {
    iconUrl: string;
    value: string;
    label: string;
    textColor: string;
}

interface MetricsCardProps {
    metrics: MetricData[];
}

export default function MetricsCard({ metrics }: MetricsCardProps) {
    return (
        <div className="flex justify-between items-center px-[10px] lg:px-[34px] h-[117px] bg-white shadow-sm rounded-lg">
            {metrics?.map((metric, index) => (
                <SingleMetricCard key={index} {...metric} />
            ))}
        </div>
    );
}
