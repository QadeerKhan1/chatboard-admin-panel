import { LinkIconProps } from "@/interface/link-icon-props";
export const LinkIcon = ({
    icon,
    text,
    textColor,
    bgColor,
    handleNavigate
}: LinkIconProps) => (
    <div
        onClick={(e) => handleNavigate && handleNavigate(e)}
        className={`w-full h-[45px] 2xl:h-[50px] 
            ${bgColor === "bg-primary" ? "bg-gradient-to-r from-[rgba(52,199,89,0.14)] to-[rgba(196,196,196,0)]" : "opacity-50"}
  transition-all duration-150 flex items-center gap-[15px] cursor-pointer`}

    >
        {/* Left Indicator (For Active State) */}
        <span
            className={`w-[5px] h-full rounded-r-[10px] ${bgColor === 'bg-primary' ? "bg-primary" : "bg-transparent"}`}
        ></span>
        <div className="flex items-center gap-[20px] px-[10px] ">
            {icon && <span className="w-[14%] xl:w-[10%]">{icon}</span>}
            <span
                className={`${text === "Logout" ? "text-redColor" : `text-${textColor}`} 
                font-medium text-sm xl:text-base 2xl:text-lg w-full`}

            >
                {text}
            </span>
        </div>
    </div>
);

export default LinkIcon;