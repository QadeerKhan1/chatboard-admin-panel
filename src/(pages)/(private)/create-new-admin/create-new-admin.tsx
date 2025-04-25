'use client';
import React, { useState } from 'react';
import CreateAdmin from './create-admin/create-admin';
import AdminHeader from './admin-header/admin-header';
import { useDeleteUserMutation, useGetUserInfoQuery } from '@/store/user-setting/user-setting';
import AdminTable from './admin-table/admin-table';
import { useSession } from 'next-auth/react';
import Modal from '@/components/common/modal/modal';
import { toast } from '@/hooks/use-toast';
import useViewportHeight from '@/hooks/useViewportHeight';
// import AdminHeader from './admin-header/admin-header';
// import UserTable from '../user-management/table/table';
// import { users } from '@/utils/users-data';

export default function CreateNewAdmin({ action }: { action?: string }) {
    const [modal, setModal] = React.useState(false);
    const [userId, setUserId] = React.useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const screenHeight = useViewportHeight();
    const limit = screenHeight < 600 ? 6 : screenHeight < 700 ? 7 : screenHeight < 800 ? 8 : screenHeight < 900 ? 9 : 10

    const { data: users, isLoading } = useGetUserInfoQuery({
        page: currentPage,
        limit
    });
    const totalPages = Math.ceil(users?.data?.total / limit);

    const { data: session } = useSession();
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
    console.log(session?.user?.role, 'role');

    const handleConfirm = async () => {
        try {
            await deleteUser(userId);
            toast({
                title: 'Success',
                description: 'User deleted successfully',
                variant: 'default',
            })
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    const handlePageChange = (page: number) => {

        setCurrentPage(page)


    }

    const handleDelete = (id: string, role: string) => {
        if (role === 'superadmin' && session?.user?.role === 'superadmin') {
            toast({
                title: 'Error',
                description: 'You are not authorized to delete super admin.',
                variant: 'destructive',
            })
            return null
        } else {
            setUserId(id);
            setModal(true);
        }

    }
    console.log(users?.data?.total, 'total');
    return (
        action === 'create' ? (
            <CreateAdmin />
        ) : (
            <div className="h-full space-y-[37px]">
                <AdminHeader />
                <AdminTable
                    activeTab="not-new"
                    users={users?.data?.data || []}
                    onDelete={(id, role) => handleDelete(id, role)}
                    // onDelete={(user) => console.log("Deleted:", user)}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                    totalPages={totalPages || 1}
                    blockDeleteBtnText="Remove"
                    role={session?.user?.role || ''}
                    loading={isLoading}
                />
                <Modal
                    open={modal}
                    setOpen={(open) => setModal(open)}
                    title={
                        "Want to Delete"}
                    message1={`Are you sure you want to remove this user?`}
                    message2={
                        'This action cannot be undone.'
                    }
                    imageSrc={
                        '/images/delete-icon.svg'
                    }
                    confirmText={'Delete'}
                    cancelText="Cancel"
                    onConfirm={handleConfirm}
                    onCancel={() => setModal(false)}
                    isLoading={isDeleting}

                />
            </div>
        )
    );
}
