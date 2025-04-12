import {
    Table,
    TableBody,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
    TableCell
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Ban, Trash2 } from "lucide-react";
import Image from "next/image";
import RightArrow from "@/utils/right-arrow-icon";

interface User {
    name: string;
    email: string;
    phone: string;
    avatar: string;
}

interface UserTableProps {
    users: User[];
    activeTab?: string;
    onBlock?: (user: User) => void;
    onDelete?: (user: User) => void;
    onPageChange?: (page: number) => void;
    currentPage?: number;
    totalPages?: number;
    blockDeleteBtnText?: string;

}

export default function UserTable({
    users,
    activeTab,
    onBlock,
    onDelete,
    onPageChange,
    currentPage = 1,
    totalPages = 3,
    blockDeleteBtnText
}: UserTableProps) {
    return (
        <Table className="overflow-hidden">
            <TableHeader>
                <TableRow className="border-none hover:bg-transparent h-[45px] font-nunito font-semibold text-sm 2xl:text-[16px] leading-[100%] tracking-normal text-[#030229] ">
                    <TableHead className="pl-[20px]">Name</TableHead>
                    <TableHead className="pl-[20px]">Email</TableHead>
                    <TableHead className="pl-[20px]">Phone Number</TableHead>
                    <TableHead className="pl-[20px] pr-[65px] pb-0 flex items-center justify-end">Block/Delete</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="border-none bg-white h-[calc(100vh-400px)] overflow-auto">
                {users?.map((user, index) => (
                    <TableRow key={index} className="border-b-[2px] border-[#fafbff] ">
                        <TableCell className="p-[10px_65px_10px_20px] h-[65px] cursor-pointer">
                            <div className="flex items-center gap-2 font-nunito font-normal text-base 2xl:text-[16px]">
                                <Image src={user.avatar} alt={user.name} width={40} height={40} className="rounded-[6px]" />
                                {user.name}
                            </div>
                        </TableCell>
                        <TableCell className="p-[10px_65px_10px_20px] h-[65px] cursore-pointer">
                            <div className="flex items-center gap-2 font-nunito font-semibold text-xs 2xl:text-[14px]">
                                <Image src={'/images/user-management/mail-icon.png'} alt="email-icon" width={18} height={14} />
                                {user.email}
                            </div>
                        </TableCell>
                        <TableCell className="p-[10px_65px_10px_20px] h-[65px] cursore-pointer">
                            <div className="flex items-center gap-2 font-nunito font-semibold text-xs 2xl:text-[14px]">
                                <Image src={'/images/user-management/call.svg'} alt="phone-icon" width={20} height={20} />
                                {user.phone}
                            </div>
                        </TableCell>
                        <TableCell className="p-[10px_65px_10px_20px] h-[65px] cursore-pointer flex justify-end">
                            <div className="flex gap-2 w-[170px] justify-end">
                                {activeTab === "new" ? (
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="bg-[#eaf9fe] text-blue-600  h-[35px] w-[36px] "
                                        onClick={() => onBlock?.(user)}
                                    >
                                        <Ban size={16} />
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outline"
                                        className="bg-transparent border  border-[#26C0E2] h-[34px] px-[19px] rounded-[10px] font-nunito font-semibold text-[13px] text-[#26C0E2]"
                                        onClick={() => onBlock?.(user)}
                                    >
                                        {blockDeleteBtnText}
                                    </Button>
                                )}
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="bg-[#faf2f0] border-none text-red-600 h-[34px] w-[36px] "
                                    onClick={() => onDelete?.(user)}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter className="border-none bg-transparent">
                <TableRow>
                    <TableCell colSpan={4} className="text-center">
                        <div className="flex justify-end gap-2 mt-2 mr-[20px]">
                            {[...Array(totalPages)]?.map((_, i) => (
                                <Button
                                    key={i}
                                    className={`rounded-[14px] h-[45px] ${currentPage === i + 1 ? "bg-[#34C759] text-white" : "bg-[#F5F6F7] text-[#3E3232BF]"
                                        }`}
                                    variant="outline"
                                    onClick={() => onPageChange?.(i + 1)}
                                >
                                    {i + 1}
                                </Button>
                            ))}
                            <Button
                                className="bg-[#F5F6F7] text-[#3E3232BF] rounded-[14px] w-[107px] gap-2 h-[45px]"
                                variant="ghost"
                                onClick={() => onPageChange?.(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                                <RightArrow fillColor="#2649F0" width={8} height={8} />
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
