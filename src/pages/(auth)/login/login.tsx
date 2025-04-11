"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
// Define Zod schema for validation
const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email("Invalid email address"),
    password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(4, { message: "Password must be at least 8 characters." }),
});

type FormData = z.infer<typeof formSchema>;

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            const response = await signIn("credentials", {
                email: data.email,
                password: data.password,
                callbackUrl: "/",
            });
            if (!response?.ok) {
                console.log("Login failed");
            }
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <div className="w-full h-full bg-white">
            {/* Login Form Section */}
            <section className="h-full flex justify-start items-center">
                <div className="w-full flex flex-col">
                    <h2 className="font-nunito-sans font-bold text-[26px] lg:text-[30px] 2xl:text-[34.88px] leading-[40px] tracking-[0em] text-[#525252]">
                        Sign in to <br /> your Account
                    </h2>
                    <p className="mt-4 font-nunito-sans font-normal text-lg 2xl:text-[20px] leading-[100%] tracking-[0em] text-[#746F6F]">
                        Sign in to continue your journey with us.
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5 mt-10 h-full pb-2"
                    >
                        {/* Email Input */}
                        <div>
                            <Input
                                type="email"
                                placeholder="Enter Email"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div>
                            <Input
                                type="password"
                                className="text-black"
                                placeholder="Enter Password"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between gap-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <label
                                    htmlFor="terms"
                                    className="text-sm text-[#8E8E8E] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remember me
                                </label>
                            </div>
                            <Link href={"/forgot-password"} className="cursor-pointer font-nunito font-semibold text-[16px] leading-[157%] tracking-[0em] text-[#EA4335]">
                                Forgot Password
                            </Link>
                        </div>
                        {/* Submit Button */}
                        <Button
                            variant="default"
                            type="submit"
                            className="w-full !mt-[50px]"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Logging in..." : "Sign In"}
                        </Button>
                    </form>
                </div>
            </section>
        </div>
    );
}
