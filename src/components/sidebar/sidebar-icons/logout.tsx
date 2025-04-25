import Modal from '@/components/common/modal/modal';
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Logout() {
    const [modal, setModal] = React.useState(false);
    const { push } = useRouter();
    const handleConfirmLogout = async () => {

        // Clear the custom cookie
        document.cookie = "next-auth.accessToken=; Max-Age=0; path=/";
        // Then sign out (redirect will still happen)
        await signOut({ callbackUrl: "/", redirect: false });
        push("/login");

    };

    return (
        <div className="flex justify-center items-center">
            <Button onClick={() => setModal(true)} className="px-[38px] mb-0 2xl:h-[45px] bg-[#ff6259] hover:bg-[#ff6259] xl:h-[45px] mx-auto">
                Log Out
            </Button>
            <Modal
                open={modal}
                setOpen={(open) => setModal(open)}
                title={'Logout'}
                message1={

                    'You have been logged out. See you again '
                }
                message2={
                    'soon!.'
                }
                imageSrc={
                    '/images/logout-icon.svg'
                }
                confirmText={'Logout'}
                cancelText="Cancel"
                onConfirm={handleConfirmLogout}
                onCancel={() => setModal(false)}

            />
        </div>
    )
}
