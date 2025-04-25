"use client";

import { InputOTPForm } from "@/components/common/otp-field/otp-fields";
import React, { useEffect, useState, Suspense } from "react";

export default function OtpVerification() {
    const [time, setTime] = useState(180); // Initial time in seconds

    useEffect(() => {
        if (time <= 0) return;
        const interval = setInterval(() => setTime((t) => t - 1), 1000);
        return () => clearInterval(interval);
    }, [time]);

    return (
        <div className="w-full h-full bg-white flex items-center justify-start">
            <div className="w-full flex flex-col">
                <section className="flex flex-col gap-[10px] mt-2.5 2xl:mt-[50px]">
                    <h2 className="font-nunito-sans font-bold text-[26px] lg:text-[30px] 2xl:text-[34.88px] leading-[40px] tracking-[0em] text-[#525252] ">
                        Verify it’s you
                    </h2>
                    <p className="font-nunito-sans font-normal text-lg 2xl:text-[20px] leading-[100%] tracking-[0em] text-[#746F6F] ">
                        We sent a code to ( *****@mail.com ). Enter it <br /> here to verify your identity.
                    </p>

                    {/* ✅ Wrap component using `useSearchParams()` in Suspense */}
                    <Suspense fallback={<div>Loading OTP form...</div>}>
                        <InputOTPForm length={4} setTime={setTime} time={time} />
                    </Suspense>
                </section>
            </div>
        </div>
    );
}
