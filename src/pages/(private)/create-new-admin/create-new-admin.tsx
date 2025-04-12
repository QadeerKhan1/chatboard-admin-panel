'use client';

import React from 'react';
import CreateAdmin from './create-admin/create-admin';
import AdminHeader from './admin-header/admin-header';
import UserTable from '../user-management/table/table';
import { users } from '@/utils/users-data';

export default function CreateNewAdmin({ action }: { action?: string }) {
    return (
        <>
            {action === 'create' ? (
                <CreateAdmin />
            ) : (
                <div className="h-full space-y-[37px]">
                    <AdminHeader />
                    <UserTable
                        activeTab="not-new"
                        users={users}
                        onBlock={(user) => console.log("Blocked:", user)}
                        onDelete={(user) => console.log("Deleted:", user)}
                        onPageChange={(page) => console.log("Page:", page)}
                        currentPage={1}
                        totalPages={3}
                        blockDeleteBtnText="Remove"
                    />
                </div>
            )}
        </>
    );
}
