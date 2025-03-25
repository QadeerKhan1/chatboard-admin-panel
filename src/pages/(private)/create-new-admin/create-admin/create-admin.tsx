import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Camera } from "lucide-react";
import Image from "next/image";

export default function CreateAdmin() {
    const [image, setImage] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-full space-y-[31px]">
            <h2 className="text-lg font-semibold mb-4">Add <span className="text-black">New Admin</span></h2>

            {/* Image Upload */}
            <section className="bg-white p-10">
                <div className="flex justify-center mb-6">
                    <label className="relative w-[156px] h-[156px] bg-[#F7F7F8] rounded-[8px] flex items-center justify-center cursor-pointer">
                        {image ? (
                            <img src={image} alt="Profile" className="w-full h-full object-cover rounded-md" />
                        ) : (
                            <Image src="/images/create-new-admin/camera-icon.svg" alt="Upload" width={27} height={24} />
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                </div>

                {/* User Information */}
                {/* <div className="flex items-center gap-2">
                    <span className="text-primary w-[4px] h-[16px] rounded-[12px] mt-[-7px]">|</span>
                    <h3 className="font-nunito border font-medium text-[21px] xl:text-[24px] 2xl:text-[27px] tracking-[0px] capitalize ">
                        User Information
                    </h3>
                   
                </div> */}
                <h3 className="font-nunito font-medium text-[21px] xl:text-[24px] 2xl:text-[27px] tracking-[0px]  capitalize flex items-center gap-[5px]">
                    <span className="w-[4px] h-[16px] bg-primary rounded-[12px]"></span>
                    User Information</h3>
                <div className="grid grid-cols-3 gap-[24px] mt-4">
                    <Input label="User Name" className="h-[50px] xl:h-[50px] 2xl:h-[50px] " placeholder=" " />
                    <Input label="Email" className="h-[50px] xl:h-[50px] 2xl:h-[50px] " placeholder=" " />
                    <Input label="User Phone Number" className="h-[50px] xl:h-[50px] 2xl:h-[50px] " placeholder="" />
                    <div>
                        <label htmlFor="" className="block mb-[3px] font-semibold text-xs xl:text-sm 2xl:text-base leading-[25.2px] tracking-[-0.02em] text-left text-[#030229] ">Admin Type</label>
                        <Select>
                            <SelectTrigger className="bg-[#FAFAFB] h-[50px]  ">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="patient">Patient Admin</SelectItem>
                                <SelectItem value="staff">Staff Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Input label="Password" className="h-[50px] xl:h-[50px] 2xl:h-[50px] " placeholder="" type="password" />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end mt-6">
                    <Button className="bg-primary h-[72px] text-white px-[58px] rounded-[10px]">Add Now</Button>
                </div>
            </section>
        </div>
    );
}
