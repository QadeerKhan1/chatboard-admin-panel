"use client";

import { LinkIconProps } from "../../../interface/link-icon-props"; // ✅ Ensure correct import path

const LinkIcon = ({
    icon,
    text,
    textColor,
    bgColor,
    onClick,
}: LinkIconProps) => (
    <div
        onClick={onClick}
        className={`w-full h-[50px] px-[10px] rounded-[10px] ${bgColor} 
            ${bgColor !== "bg-primary" ? "hover:bg-lightHover" : "hover:bg-primary"} 
            transition-all duration-150 border border-secondary flex items-center gap-[10px] cursor-pointer`}
    >
        {icon && <span className="w-[14%] xl:w-[10%]">{icon}</span>}
        <span
            className={`font-medium text-sm xl:text-base 2xl:text-lg w-[86%] xl:w-[90%] ${textColor === "white" ? "text-white" : "text-darkGray"}`}
        >
            {text}
        </span>
    </div>
);

export default LinkIcon;
