"use client";

import Image from "next/image";

interface MetricCardProps {
    iconUrl: string;
    value: string;
    label: string;
    bgColor?: string;
}

export default function SingleMetricCard({ iconUrl, value, label }: MetricCardProps) {
    console.log(value, 'value');
    return (
        <div className={`flex items-center justify-center pl-[15px] w-[25%]  ${value === "99% (correct)" ? 'border-none' : 'border-r border-[#E5E5E5]'}   gap-3 opacity-[80%]`}>
            {/* Icon Container */}
            <Image src={iconUrl} alt="Icon" className="w-[40px] h-[40px] xl:w-[53px] xl:h-[53px] " width={0} height={0} />

            {/* Text Content */}
            <div className="space-y-2 ">
                <h2 className={`font-nunito font-bold text-base xl:text-[18px] 2xl:text-[20px] leading-[100%] tracking-[0em]   text-black w-[100px] `}>{value}</h2>
                <p className="font-nunito  font-normal text-xs   leading-[100%] tracking-[0em] text-[#030229]">{label}</p>
            </div>
        </div>
    );
}
