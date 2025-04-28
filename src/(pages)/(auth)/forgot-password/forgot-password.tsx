"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { requestOTP } from "@/store/auth-slice/auth-slice";

// Forgot Password Page
export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { push } = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true); // Start loading

        try {
            const response = await requestOTP(email);
            if (response?.data?.status) {
                push(`/otp-verification?reset=${btoa(email)}`, { scroll: false });
                toast({
                    title: "Success",
                    description: "OTP sent successfully",
                    variant: "default",
                });
            }
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error);
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false); // Stop loading
        }
    };


    return (
        <div className="w-full h-full bg-white flex items-center justify-start">
            <div className="w-full flex flex-col">
                <h2 className="font-nunito-sans font-bold text-[26px] lg:text-[30px] 2xl:text-[34.88px] leading-[40px] tracking-[0em] text-[#525252]">
                    Forgot <br /> Your Password?
                </h2>
                <p className="mt-4 font-nunito-sans font-normal text-lg 2xl:text-[20px] leading-[100%] tracking-[0em] text-[#746F6F]">
                    Enter your email to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5 mt-10">
                    {/* Email Input */}
                    <div>
                        <Input
                            className="text-black"
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full !mt-[50px] bg-primary text-white font-semibold"
                    >
                        {isLoading ? <span className="loader" /> : "Continue"}
                    </Button>

                </form>
            </div>
        </div>
    );
}