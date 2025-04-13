"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Extend the InputProps interface to include the new props
export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    labelClassName?: string;
    error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, labelClassName, type, error, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

        const labelStyle =
            "font-semibold text-sm xl:text-base 2xl:text-lg leading-[25.2px] tracking-[-0.02em] text-left text-[#0724AB] " +
            labelClassName;

        return (
            <div className={` ${label && "space-y-[3px]"}`}>
                {label && (
                    <label htmlFor="" className={labelStyle}>
                        {label}
                    </label>
                )}
                <div className="relative  ">
                    <input
                        type={showPassword && type === "password" ? "text" : type}
                        className={cn(
                            "justify-center items-center h-[40px] xl:h-[45px] 2xl:h-[60px] w-full rounded-[7px] 2xl:rounded-[10px]  border-[1px] text-xs xl:text-sm 2xl:text-base border-[#ECECEC] font-normal leading-[22.4px] tracking-[-0.02em] text-left bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {error && <p className="text-red-500">{error}</p>}

                    {type === "password" && (
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-4 2xl:right-5 top-[30%]"
                        >
                            {showPassword ? (
                                <Image
                                    src={"/images/auth/passwordShowEyeIcon.svg"}
                                    width={0}
                                    height={0}
                                    alt="eye"
                                    className="2xl:mt-[2px]  w-[22px] 2xl:w-[24px] h-[22px] 2xl:h-[24px]"
                                />
                            ) : (
                                <Image
                                    src={"/images/auth/passwordEyeIcon.svg"}
                                    width={0}
                                    height={0}
                                    alt="eye"
                                    className=" w-[22px] 2xl:w-[24px] h-[22px] 2xl:h-[24px]"
                                />
                            )}
                        </button>
                    )}
                </div>
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
