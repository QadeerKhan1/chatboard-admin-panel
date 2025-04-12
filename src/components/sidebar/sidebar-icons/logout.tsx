import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Logout() {
    const { push } = useRouter();
    const handleLogout = async () => {
        // Clear the custom cookie
        document.cookie = "next-auth.accessToken=; Max-Age=0; path=/";

        // Then sign out (redirect will still happen)
        await signOut({ callbackUrl: "/" });
        push("/dashboard");

    };

    return (
        <div className="flex justify-center items-center">
            <Link href="/" prefetch>
                <Button onClick={handleLogout} className="px-[38px] mb-0 2xl:h-[45px] bg-[#ff6259] hover:bg-[#ff6259] xl:h-[45px] mx-auto">
                    Log Out
                </Button>
            </Link>
        </div>
    )
}
