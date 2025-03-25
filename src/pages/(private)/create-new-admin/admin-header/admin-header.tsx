import SearchField from '@/components/common/search-field/search-field'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function AdminHeader() {
    const router = useRouter();
    return (
        <div className='flex items-center justify-between pr-[5px]'>
            <SearchField />
            <Button onClick={() => router.push("/create-new-admin?action=create")} className=" h-[42px] xl:h-[42px] 2xl:h-[42px] ml-4">Create Admin</Button>
        </div>
    )
}
