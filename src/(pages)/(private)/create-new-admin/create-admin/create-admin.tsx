"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useCreateAdminMutation } from "@/store/user-setting/user-setting";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(7, "Phone number is required"),
    role: z.string().min(1, "Select a role"),
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

type FormValues = z.infer<typeof formSchema>;

export default function CreateAdmin() {
    // const [image, setImage] = useState<string | null>(null);
    
    const [role, setRole] = useState("staff");
    const [createAdmin, { isLoading }] = useCreateAdminMutation();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            role: "staff",
        },
    });

    // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files && event.target.files[0]) {
    //         const file = event.target.files[0];
    //         const reader = new FileReader();
    //         reader.onload = () => setImage(reader.result as string);
    //         reader.readAsDataURL(file);
    //     }
    // };

    const onSubmit = async (data: FormValues) => {
        const payload = { ...data };

        try {
            await createAdmin(payload).unwrap();

            toast({
                title: "Success",
                description: "Admin created successfully",
                variant: "default",
            });

            router.push("/create-new-admin");

        } catch (error) {
            const errorMessage = getErrorMessage(error);

            toast({
                title: "Error",
                description: errorMessage || "Failed to create admin",
                variant: "destructive",
            });

            console.error("Create admin error:", error);
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-[31px] ">
            <h2 className="text-lg font-semibold mb-4 ">
                Add <span className="text-black">New Admin</span>
            </h2>

            <section className="bg-white p-10 h-[calc(100vh-180px)]">
                {/* Image Upload */}
                {/* <div className="flex justify-center mb-6">
                    <label className="relative w-[156px] h-[156px] bg-[#F7F7F8] rounded-[8px] flex items-center justify-center cursor-pointer">
                        {image ? (
                            <img src={image} alt="Profile" className="w-full h-full object-cover rounded-md" />
                        ) : (
                            <Image
                                src="/images/create-new-admin/camera-icon.png"
                                alt="Upload"
                                width={27}
                                height={24}
                            />
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                </div> */}

                {/* User Info */}
                <h3 className="font-nunito font-medium text-[21px] xl:text-[24px] 2xl:text-[27px] tracking-[0px] capitalize flex items-center gap-[5px]">
                    <span className="w-[4px] h-[16px] bg-primary rounded-[12px]"></span>
                    User Information
                </h3>

                <div className="grid grid-cols-3 gap-[24px] mt-4">
                    <Input
                        label="User Name"
                        className="h-[50px] xl:h-[50px] 2xl:h-[50px]"
                        placeholder="Name"
                        {...register("name")}
                    />
                    {errors.name && <p className="text-red-500 text-sm col-span-3">{errors.name.message}</p>}

                    <Input
                        label="Email"
                        className="h-[50px] xl:h-[50px] 2xl:h-[50px]"
                        placeholder="Email"
                        {...register("email")}
                    />
                    {errors.email && <p className="text-red-500 text-sm col-span-3">{errors.email.message}</p>}

                    <Input
                        label="User Phone Number"
                        className="h-[50px] xl:h-[50px] 2xl:h-[50px]"
                        placeholder="Phone"
                        type="number"
                        {...register("phone")}
                    />
                    {errors.phone && <p className="text-red-500 text-sm col-span-3">{errors.phone.message}</p>}

                    <div>
                        <div>
                            <label htmlFor="" className="block mb-[3px] font-semibold text-xs xl:text-sm 2xl:text-base leading-[25.2px] tracking-[-0.02em] text-left text-[#030229] ">Admin Type</label>
                            <Select
                                value={role}
                                onValueChange={(val) => {
                                    setRole(val);
                                    setValue("role", val);
                                }}>
                                <SelectTrigger className="bg-[#FAFAFB] h-[50px] border-none">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="p-0">
                                    <SelectItem
                                        value="admin"
                                        className="relative p-0 pl-3 py-2 text-sm data-[state=checked]:bg-white data-[state=checked]:text-primary data-[state=checked]:font-medium"
                                    >
                                        Admin
                                    </SelectItem>
                                    <SelectItem
                                        value="superadmin"
                                        className="relative p-0 pl-3 py-2 text-sm data-[state=checked]:text-primary data-[state=checked]:bg-white    data-[state=checked]:font-medium"
                                    >
                                        Super Admin
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                        </div>
                        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                    </div>

                    <Input
                        label="Password"
                        className="h-[50px] xl:h-[50px] 2xl:h-[50px]"
                        placeholder="Password"
                        type="password"
                        {...register("password")}
                    />
                    {errors.password && <p className="text-red-500 text-sm col-span-3">{errors.password.message}</p>}
                </div>

                {/* Submit */}
                <div className="flex justify-end mt-6">
                    <Button
                        disabled={isLoading}
                        type="submit"
                        className="bg-primary h-[72px] text-white px-[58px] rounded-[10px]"
                    >
                        {isLoading ? <span className="loader"></span> : "Create Admin"}
                    </Button>
                </div>
            </section>
        </form>
    );
}
