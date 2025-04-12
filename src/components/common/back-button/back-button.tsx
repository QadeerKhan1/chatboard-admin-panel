'use client'
import RightArrow from '@/utils/right-arrow-icon';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function BackButton() {
    const router = useRouter();
    return (
        <div onClick={() => router.back()} className="rotate-180 flex items-center justify-center h-[46px] w-[46px] rounded-[16px]  hover:bg-[#F5F5F5] cursor-pointer"><RightArrow fillColor="#000000" width={12} height={17} />
        </div>
    )
}
