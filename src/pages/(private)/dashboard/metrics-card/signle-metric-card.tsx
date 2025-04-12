"use client";

import Image from "next/image";

interface MetricCardProps {
    iconUrl: string;
    value: string;
    label: string;
    bgColor?: string;
}

export default function SingleMetricCard({ iconUrl, value, label }: MetricCardProps) {
    return (
        <div className="flex items-center justify-center w-[25%] border-r   gap-3 opacity-[80%] ">
            {/* Icon Container */}
            <Image src={iconUrl} alt="Icon" width={53} height={53} />

            {/* Text Content */}
            <div className="space-y-2">
                <h2 className={`font-nunito font-bold text-lg xl:text-[20px] 2xl:text-[22px] leading-[100%] tracking-[0em] text-black`}>{value}</h2>
                <p className="font-nunito font-normal text-xs xl:text-[14px] leading-[100%] tracking-[0em] text-[#030229]">{label}</p>
            </div>
        </div>
    );
}
