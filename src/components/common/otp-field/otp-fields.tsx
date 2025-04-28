"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { toast } from "@/hooks/use-toast";
import { verifyOTP } from "@/store/auth-slice/auth-slice";

interface InputOTPFormProps {
    length?: number;
    setTime: React.Dispatch<React.SetStateAction<number>>;
    time: number;
}

export const InputOTPForm: React.FC<InputOTPFormProps> = ({
    length = 4, // ✅ set default to 4
    time,
}) => {
    const { push } = useRouter();
    const searchParams = useSearchParams();
    const reset = searchParams?.get("reset");
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (isNaN(Number(value)) || value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && index > 0 && !otp[index]) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === "Enter") {
            onSubmit();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, length);
        const newOtp = pastedData.split("")?.map((char) => (isNaN(Number(char)) ? "" : char));

        setOtp(newOtp);
        inputRefs.current[newOtp.length - 1]?.focus();
    };

    const onSubmit = async () => {
        // if (time === 0) {
        //   return;
        // }
        const combinedOtp = otp.join("");
        if (combinedOtp.length !== length) {
            alert("Please enter a valid OTP");
            return;
        }
        const decodedEmail = atob(reset || "");



        // Mock API call with the decoded email and OTP
        try {
            await verifyOTP(decodedEmail, combinedOtp);

            toast({
                title: "Success",
                description: "Email verified successfully",
                variant: "default",
            });
            push(`/reset-password?email=${reset}`, { scroll: false });

        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error);
            console.log("error : ", errorMessage)
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        }
    };

    // const resendOtpHandler = async () => {
    //     setOtp(new Array(length).fill(""));
    //     setTimeout(() => {
    //         console.log("OTP Resent");
    //         setTime(180);
    //     }, 1500);
    // };

    // ✅ Auto-submit once all inputs are filled
    useEffect(() => {
        if (otp.every((digit) => digit !== "")) {
            onSubmit();
        }
    }, [otp]);

    return (
        <>
            <div className="flex gap-x-[15px] mt-[28px] ">
                {otp?.map((value, index) => (
                    <input
                        key={index}
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(index, e)}
                        ref={(input) => {
                            inputRefs.current[index] = input;
                        }}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        autoFocus={index === 0}
                        className={`w-[60px] h-[60px] 2xl:w-[68px] 2xl:h-[68px] text-[20px] lg:text-[25px] 2xl:text-[30px] font-normal text-center text-grey border-[0.75px] focus:outline-none border-primary rounded-[10px] ${value ? "bg-primary text-white" : "bg-white"
                            } font-roboto font-bold leading-[130%] tracking-[-0.24px]`}
                    />
                ))}
            </div>

            <div className="w-full flex flex-col gap-[15px] 2xl:gap-[20px] mt-[15px]">
                <p className="mt-[25px] ml-[170px] text-[#505050] text-[12px] xl:text-sm 2xl:text-base">
                    {time > 0 && "Resend Code:"}{" "}
                    {time > 0 && <span className="text-[#DA4A54]">{time}</span>}
                </p>
            </div>
        </>
    );
};
