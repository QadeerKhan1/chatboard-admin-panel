"use client";
import { InputOTPForm } from "@/components/common/otp-field/otp-fields";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface OtpVerificationProps {
    params: {
        searchParams: {
            signUp?: string;
            reset?: string;
            passKey?: string;
        };
    };
}

export function OtpVerification() {
    const [time, setTime] = useState(180); // Initial time in seconds

    // const isReset = params.searchParams.hasOwnProperty("reset");

    useEffect(() => {
        if (time <= 0) return; // Stop countdown when time reaches 0

        const interval = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [time]);

    return (
        <div className="w-full h-full bg-white flex items-center justify-start">
            <div className="w-full flex flex-col">

                {/* OTP Section */}
                <section className="flex flex-col gap-[10px] mt-2.5 2xl:mt-[50px]">
                    <h2 className="font-nunito-sans font-bold text-[26px] lg:text-[30px] 2xl:text-[34.88px] leading-[40px] tracking-[0em] text-[#525252] ">
                        Verify it’s you
                    </h2>
                    {/* <p className="mt-4 font-nunito-sans font-normal text-lg 2xl:text-[20px] leading-[100%] tracking-[0em] text-[#746F6F] ">
                        {isReset
                            ? "Enter the OTP sent to your email address to verify your request and reset your password."
                            : "Enter the OTP sent to your email address to verify your account and complete registration."}
                    </p> */}
                    <p className="font-nunito-sans font-normal text-lg 2xl:text-[20px] leading-[100%] tracking-[0em] text-[#746F6F] ">We send a code to ( *****@mail.com ). Enter it <br />here to verify your identity</p>

                    {/* OTP Input Form */}
                    <InputOTPForm length={4} setTime={setTime} time={time} />

                    {/* Countdown Timer */}
                    {/* <p className="text-[#746F6F] text-sm mt-2">
                        Time remaining: {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
                    </p> */}
                </section>
            </div>
        </div>
    );
}
