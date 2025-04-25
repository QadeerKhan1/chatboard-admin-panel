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
      "font-semibold text-xs xl:text-sm 2xl:text-base leading-[25.2px] tracking-[-0.02em] text-left text-[#030229] " +
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
              "justify-center  bg-[#F9FAFB] rounded-[7px] items-center h-[50px] lg:h-[55px] xl:h-[60px] 2xl:h-[65px]  w-full  text-base  text-left  px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed font-nunito-sans font-semibold text-[16px] leading-[28.54px] tracking-[0em] align-middle  text-black ",
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
                  src={"/images/hide-password-icon.svg"}
                  width={0}
                  height={0}
                  alt="eye"
                  className="2xl:mt-[2px]  w-[22px] 2xl:w-[24px] h-[22px] 2xl:h-[24px]"
                />
              ) : (
                <Image
                  src={"/images/show-password-icon.svg"}
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
