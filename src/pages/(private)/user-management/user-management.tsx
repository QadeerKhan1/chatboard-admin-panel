'use client'
import DataNotFound from '@/components/common/data-not-found/data-not-found'
import React, { useState } from 'react'
import { UserTable } from './table/table'
import { users } from '@/utils/users-data'
import { ManagementHeader } from './management-header/management-header'
import Modal from '@/components/common/modal/modal'

export default function UserManagement() {
    const [activeTab, setActiveTab] = useState<string>("new");
    const [modal, setModal] = useState<{ isOpen: boolean, type: "delete" | "block" | null }>({
        isOpen: false,
        type: null
    });

    const openModal = (type: "delete" | "block") => {
        setModal({ isOpen: true, type });
    };

    const closeModal = () => {
        setModal({ isOpen: false, type: null });
    };

    const handleConfirm = () => {
        if (modal.type === "delete") {
            console.log("User Deleted!");
        } else if (modal.type === "block") {
            console.log("User Blocked!");
        }
        closeModal(); // Close modal after action
    };

    return (
        <div className='flex flex-col gap-[20px] overflow-hidden 2xl:gap-[25px] h-full'>
            <ManagementHeader activeTab={activeTab} setActiveTab={(tab: string) => setActiveTab(tab)} />

            <UserTable
                users={users}
                onBlock={() => openModal("block")}
                onDelete={() => openModal("delete")}
                onPageChange={(page) => console.log("Page:", page)}
                currentPage={1}
                totalPages={3}
                blockDeleteBtnText="Unblock"
                activeTab={activeTab}
            />

            {modal.isOpen && (
                <Modal
                    open={modal.isOpen}
                    setOpen={closeModal}
                    title={modal.type === "delete" ? "Want to Delete" : "User Blocked!"}
                    message1={
                        modal.type === "delete"
                            ? "Are you sure you want to delete this user? You will not"
                            : "This user no longer has access to the"
                    }
                    message2={
                        modal.type === "delete"
                            ? "able to recover them."
                            : "platform."
                    }
                    imageSrc={modal.type === "delete" ? "/images/delete-icon.svg" : "/images/block-icon.svg"}
                    confirmText={modal.type === "delete" ? "Delete" : "Block"}
                    cancelText="Cancel"
                    onConfirm={handleConfirm}
                    onCancel={closeModal}
                />
            )}
        </div>
    );
}
