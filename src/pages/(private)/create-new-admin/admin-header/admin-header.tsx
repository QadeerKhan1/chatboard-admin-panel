import SearchField from '@/components/common/search-field/search-field'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { createNewAdmin } from "@/components/sidebar/sidebar-icons/create-new-admin";

export default function AdminHeader() {
    const router = useRouter();
    return (
        <div className='flex items-center justify-between pr-[5px]'>
            <SearchField />
            <Button onClick={() => router.push("/create-new-admin?action=create")} className="flex items-center gap-2 h-[42px] xl:h-[42px] 2xl:h-[42px] ml-4">
                {createNewAdmin({ fillColor: "#FFFFFF" })}
                Create Admin</Button>
        </div>
    )
}
