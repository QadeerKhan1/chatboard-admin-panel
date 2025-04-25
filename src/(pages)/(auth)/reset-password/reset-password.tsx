'use client';

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { resetPassword } from "@/store/auth-slice/auth-slice";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useRouter, useSearchParams } from "next/navigation";

// ✅ Zod schema with password rules
const formSchema = z.object({
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .refine((val) => /[A-Z]/.test(val), {
            message: "Password must include at least one uppercase letter",
        })
        .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
            message: "Password must include at least one special character",
        }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

export default function ResetPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const { push } = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams?.get("email");

    const onSubmit = async (data: FormData) => {
        const decodedEmail = atob(email || "");
        try {
            await resetPassword(decodedEmail, data.password);
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

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-10">
                    <div>
                        <Input
                            type="password"
                            placeholder="Enter Password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full !mt-[50px]"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <span className="loader" /> : "Continue"}
                    </Button>
                </form>
            </section>
        </div>
    );
}
