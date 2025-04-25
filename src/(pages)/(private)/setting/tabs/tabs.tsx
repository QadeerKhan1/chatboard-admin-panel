import RightArrow from '@/utils/right-arrow-icon'
import Link from 'next/link'
import React from 'react'

export default function Tabs() {
    return (
        <div className='w-full'>
            <Link href={'/settings?tab=account-settings'} className='text-[#030229]  flex items-center justify-between h-[84px] font-nunito font-medium text-base 2xl:text-[18px] leading-[100%] tracking-[0em] mb-4'>Account Settings
                <RightArrow fillColor='#000000' width={12} height={18} />
            </Link>
            {/* <Link href={'/settings?tab=connected-accounts'} className='text-[#030229] flex items-center justify-between h-[64px] font-nunito font-medium text-base 2xl:text-[18px] leading-[100%] tracking-[0em] mb-4'>Connected Accounts
                <RightArrow fillColor='#000000' width={12} height={18} />
            </Link> */}
        </div>
    )
}
