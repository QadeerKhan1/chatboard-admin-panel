'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { resetPassword } from "@/store/auth-slice/auth-slice";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [confirmTouched, setConfirmTouched] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { push } = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams?.get("email");

    const validatePassword = (value: string) => {
        const hasUppercase = /[A-Z]/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

        if (value.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!hasUppercase || !hasSpecialChar) {
            return "Must include one uppercase letter and one special character";
        }
        return "";
    };

    const validateConfirmPassword = (value: string) => {
        if (value !== password) {
            return "Passwords do not match";
        }
        return "";
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        if (passwordTouched) {
            setPasswordError(validatePassword(value));
        }
        if (confirmTouched) {
            setConfirmPasswordError(validateConfirmPassword(confirmPassword));
        }
    };

    const handleConfirmChange = (value: string) => {
        setConfirmPassword(value);
        if (confirmTouched) {
            setConfirmPasswordError(validateConfirmPassword(value));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordTouched(true);
        setConfirmTouched(true);

        const passwordErr = validatePassword(password);
        const confirmErr = validateConfirmPassword(confirmPassword);

        setPasswordError(passwordErr);
        setConfirmPasswordError(confirmErr);

        if (passwordErr || confirmErr) return;

        setIsSubmitting(true);
        const decodedEmail = atob(email || "");

        try {
            await resetPassword(decodedEmail, password);
            toast({
                title: "Success",
                description: "Password reset successfully",
                variant: "default",
            });
            push("/login");
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error);
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full h-full bg-white flex justify-center items-center">
            <section className="w-full flex flex-col">
                <h2 className="font-nunito-sans font-bold text-[26px] lg:text-[30px] 2xl:text-[34.88px] leading-[40px] text-[#525252]">
                    Reset Password
                </h2>
                <p className="mt-4 font-nunito-sans font-normal text-lg 2xl:text-[20px] text-[#746F6F]">
                    Enter New Password
                </p>

                <form onSubmit={handleSubmit} className="space-y-5 mt-10">
                    <div>
                        <Input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            onBlur={() => {
                                setPasswordTouched(true);
                                setPasswordError(validatePassword(password));
                            }}
                        />
                        {passwordTouched && passwordError && (
                            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                        )}
                    </div>

                    <div>
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => handleConfirmChange(e.target.value)}
                            onBlur={() => {
                                setConfirmTouched(true);
                                setConfirmPasswordError(validateConfirmPassword(confirmPassword));
                            }}
                        />
                        {confirmTouched && confirmPasswordError && (
                            <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full !mt-[50px]"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Processing..." : "Continue"}
                    </Button>
                </form>
            </section>
        </div>
    );
}
