'use client'
import DataNotFound from '@/components/common/data-not-found/data-not-found'
import React, { useState } from 'react'
import { UserTable } from './table/table'
import { users } from '@/utils/users-data'
import { ManagementHeader } from './management-header/management-header'
import Modal from '@/components/common/modal/modal'

export default function UserManagement() {

    const [activeTab, setActiveTab] = useState("new");
    const [modal, setModal] = useState({
        delete: false,
        block: false
    });
    const handleDelete = () => {
        setModal({ ...modal, delete: true });
    };
    const handleBlock = () => {
        setModal({ ...modal, block: true });
    }
    return (
        <div className='flex flex-col gap-[25px] 2xl:gap-[37px] h-full '>
            <ManagementHeader activeTab={activeTab} setActiveTab={(tab: string) => setActiveTab(tab)} />
            <UserTable
                users={users}
                activeTab={activeTab}
                onBlock={(user) => console.log("Blocked:", user)}
                onDelete={(user) => handleDelete()}
                onPageChange={(page) => console.log("Page:", page)}
                currentPage={1}
                totalPages={3}
                blockDeleteBtnText="Unblock"
            />
            <Modal
                open={modal.delete}
                setOpen={(open: boolean) => setModal({ ...modal, delete: open })}
                title="Delete User"
                message1="Are You want to delete the User? you will not"
                message2="able to recover them."
                imageSrc="/images/delete-icon.svg"
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={handleDelete}
                onCancel={() => setModal({ ...modal, delete: false })}
            />
        </div>
    )
}
