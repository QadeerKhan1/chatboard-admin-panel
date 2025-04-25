'use client'
import React, { useState } from 'react'
import UserTable, { User } from './table/table'
import ManagementHeader from './management-header/management-header'
import Modal from '@/components/common/modal/modal'
import {
    useGetUserManagementListQuery,
    useUpdateSingleUserMutation,
} from '@/store/user-management/user-management-slice'
import { toast } from '@/hooks/use-toast'
import DataNotFound from '@/components/common/data-not-found/data-not-found'
import useViewportHeight from '@/hooks/useViewportHeight'

export default function UserManagement() {
    const [activeTab, setActiveTab] = useState<string>('new')
    const [modal, setModal] = useState(false)
    const [currentUser, setCurrentUser] = useState<User>({} as User)

    // 🟡 Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const screenHeight = useViewportHeight();
    const limit = screenHeight < 600 ? 6 : screenHeight < 700 ? 7 : screenHeight < 800 ? 8 : screenHeight < 900 ? 9 : 10
    const { data, isLoading, isFetching } = useGetUserManagementListQuery({
        page: currentPage,
        limit,
    })
    const [updateSingleUser, { isError, isLoading: isUpdating }] = useUpdateSingleUserMutation()

    const users = data?.data?.data ?? [] // Adjust based on your API response shape
    const totalPages = Math.ceil(data?.data?.totalPages / limit);


    const handleConfirm = async () => {
        if (currentUser) {
            try {
                const response = await updateSingleUser({
                    user: currentUser._id,
                    status: currentUser.status === 'active' ? 'blocked' : 'active',
                })
                console.log(response, 'response');
                console.log(isError, 'isError');
                if (response?.data?.status) {
                    toast({
                        title: 'Success',
                        description: `User ${currentUser.status === 'active' ? 'blocked' : 'unblocked'} successfully`,
                        variant: 'default',
                    })
                } else {
                    toast({
                        title: 'Error',
                        description: 'Failed to block user',
                        variant: 'destructive',
                    })
                }
            } catch (error) {
                console.error('Error blocking user:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to block user',
                    variant: 'destructive',
                })
            }
            setModal(false)
        }
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }
    const handleActiveBlock = (user: User) => {
        setCurrentUser(user);
        setModal(true);
    }

    if (users.length === 0 && !isLoading && !isFetching) {
        return (<DataNotFound description='It looks like there are no users' description2='available at the moment' title='No User Found' />)

    }

    return (
        <div className="flex flex-col gap-[15px] lg:gap-[20px] overflow-hidden 2xl:gap-[25px] h-full">
            <ManagementHeader activeTab={activeTab} setActiveTab={(tab: string) => {
                setActiveTab(tab)
                setCurrentPage(1) // Reset to page 1 when changing tabs
            }} />

            <UserTable
                users={users}
                loading={isLoading || isFetching}
                onBlock={(user) => handleActiveBlock(user)}
                onPageChange={handlePageChange}
                currentPage={currentPage}
                totalPages={totalPages || 1}
                blockDeleteBtnText="Unblock"
            />

            <Modal
                open={modal}
                setOpen={(open) => setModal(open)}
                title={
                    currentUser.status === 'active' ? 'Block User' : 'Unblock User'}
                message1={`Are you sure you want to ${currentUser.status === 'active' ? 'block' : 'unblock'} this user?`}
                message2={
                    'This action cannot be undone.'
                }
                imageSrc={
                    '/images/block-icon.svg'
                }
                confirmText={'Block'}
                cancelText="Cancel"
                onConfirm={handleConfirm}
                onCancel={() => setModal(false)}
                isLoading={isUpdating}

            />
        </div>
    )
}
