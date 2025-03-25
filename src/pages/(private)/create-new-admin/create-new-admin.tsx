'use client'
import React from 'react'
import { UserTable } from '../user-management/table/table'
import { users } from '@/utils/users-data'
import AdminHeader from './admin-header/admin-header'
import { useSearchParams } from 'next/navigation'
import CreateAdmin from './create-admin/create-admin'

export default function CreateNewAdmin() {

    const params = useSearchParams(); // Correct way to get 'tab' param
    const tab = params?.get("action");

    return (
        <>
            {tab === "create" ? (
                <CreateAdmin />
            ) : (
                <div className='h-full space-y-[37px]'>
                    <AdminHeader />
                    <UserTable
                        activeTab='not-new'
                        users={users}
                        onBlock={(user) => console.log("Blocked:", user)}
                        onDelete={(user) => console.log("Deleted:", user)}
                        onPageChange={(page) => console.log("Page:", page)}
                        currentPage={1}
                        totalPages={3}
                        blockDeleteBtnText="Remove"
                    />

                </div>
            )
            }
        </>
    )
}
