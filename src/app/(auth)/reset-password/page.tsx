import ResetPassword from '@/pages/(auth)/reset-password/reset-password'
import React, { Suspense } from "react";


export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPassword />
        </Suspense>
    )
}
