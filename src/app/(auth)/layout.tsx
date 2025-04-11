import BackButton from "@/components/common/back-button/back-button";
import RightArrow from "@/utils/right-arrow-icon";
import Image from "next/image";
import { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="flex items-center h-screen w-full  ">
            {/* Sidebar */}
            <div className="w-1/2 bg-white  flex justify-center items-center ">
                <Image
                    src="/images/login-sidebar.svg"
                    alt="Auth Logo"
                    width={800}
                    height={600}
                />
            </div>

            {/* Right Content Section */}
            <div className="w-1/2 p-[100px_100px_100px_00px] space-y-[38px] ">
                <BackButton />
                <div className="w-full max-w-xl ">{children}</div>
            </div>
        </div>
    );
}
