"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useUpdateUserInfoMutation } from "@/store/user-setting/user-setting";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(8, "Phone number is required"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .refine((val) => /[A-Z]/.test(val), {
            message: "Password must include at least one uppercase letter",
        })
        .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
            message: "Password must include at least one special character",
        }),
});

type FormData = z.infer<typeof formSchema>;

export default function AccountSetting() {
    const { data: session } = useSession();
    const [updateData, { isLoading }] = useUpdateUserInfoMutation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
        },
    });

    useEffect(() => {
        if (session?.user) {
            setValue("name", session.user.name || "");
            setValue("email", session.user.email || "");
            setValue("phone", session.user.phone || "");
        }
    }, [session, setValue]);

    const onSubmit = async (formData: FormData) => {
        const { name, email, phone } = formData;
        const userId = session?.user?.id;

        if (!userId) return;

        try {
            await updateData({ id: userId, updatedInfo: { name, email, phone } });
            toast({ title: "Success", description: "User updated successfully" });
        } catch (error) {
            console.error("Error updating user:", error);
            toast({ title: "Error", description: "Failed to update user", variant: "destructive" });
        }
    };

    return (
        <div className="w-full rounded-lg">


            <div className="bg-white h-[calc(100vh-122px)]">
                <div className="relative bg-primary h-20 rounded-t-lg flex items-end gap-4 p-4">
                    <div className="absolute flex items-center gap-3 -bottom-20 left-4">
                        <Image
                            src="/images/nav-img.jpg"
                            alt="User Avatar"
                            width={108}
                            height={108}
                            className="rounded-full border-[7px] border-white"
                        />
                        <div className="mt-8 text-center">
                            <h2 className="text-lg text-[#030229] 2xl:text-xl font-bold">{session?.user?.name || "User Name"}</h2>
                            <p className="text-[#ADADB0] font-semibold text-sm 2xl:text-base">{session?.user?.email || "email@example.com"}</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-32 px-8 pb-8 bg-white">
                    <h3 className="font-nunito font-medium text-[20px] xl:text-[22px] 2xl:text-[24px] leading-[100%] tracking-[0px] capitalize flex items-center gap-[5px]">
                        <span className="w-[3px] h-[14px] bg-primary"></span>
                        Personal Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[45px]  mt-8">
                        <div>
                            <label className="text-sm" htmlFor="name">Full Name</label>
                            <Input
                                id="name"
                                placeholder="Full Name"
                                {...register("name")}
                                className="bg-[#EEEEEE6B] text-black font-nunito font-medium text-[14px] 2xl:text-[16px]"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="text-sm" htmlFor="email">Email</label>
                            <Input
                                id="email"
                                disabled
                                placeholder="Email"
                                {...register("email")}
                                className="bg-[#EEEEEE6B]  text-black font-nunito font-medium text-[14px] 2xl:text-[16px]"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="text-sm" htmlFor="phone">Phone</label>
                            <Input
                                id="phone"
                                placeholder="123-456-7890"
                                {...register("phone")}
                                className="bg-[#EEEEEE6B] text-black font-nunito font-medium text-[14px] 2xl:text-[16px]"
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                        </div>

                        <div>
                            <label className="text-sm" htmlFor="password">Password</label>
                            <Input
                                type="password"
                                id="password"
                                placeholder="Enter Password"
                                {...register("password")}
                                className="bg-[#EEEEEE6B] text-black font-nunito font-medium text-[14px] 2xl:text-[16px]"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                    </div>

                    <div className="mt-[30px] flex justify-end">
                        <Button type="submit" disabled={isLoading} className="bg-primary px-[47px] text-white hover:bg-primary">
                            {isLoading ? <span className="loader" /> : "Update"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
