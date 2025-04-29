import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import RightArrow from "@/utils/right-arrow-icon";

export interface User {
    _id: string;
    username: string;
    email: string;
    userId: string;
    status: string;
    avatar: string;
    name: string;
    phone: string;
    role: string;
}

interface UserTableProps {
    users: User[];
    activeTab?: string;
    onDelete?: (id: string, role: string) => void;
    onPageChange?: (page: number) => void;
    currentPage?: number;
    totalPages?: number;
    blockDeleteBtnText?: string;
    loading?: boolean;
    role?: string;
}

export default function AdminTable({
    users,
    onDelete,
    onPageChange,
    currentPage = 1,
    totalPages = 3,
    loading,
    role,
}: UserTableProps) {
    return (
        <div className="flex-1 flex flex-col h-[calc(100vh-210px)] overflow-hidden">
            <div className="overflow-x-auto flex-1 bg-white min-h-[300px]">
                <Table className="w-full table-fixed border-none px-5">
                    <TableHeader>
                        <TableRow className="h-[45px] font-semibold text-sm">
                            <TableHead className="pl-[20px] w-[30%]">Name</TableHead>
                            <TableHead className="pl-[20px] w-[30%]">Email</TableHead>

                            <TableHead className="w-[30%] pl-[40px]">Phone Number</TableHead>
                            <TableHead className="pr-[70px] text-right w-[20%]">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className=" overflow-auto ">
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-[calc(100vh-30px)]">
                                    <div className="flex items-center justify-center h-full w-full">
                                        <span className="pageLoader"></span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : users?.length > 0 ? (
                            users.map((user, index) => (
                                <TableRow
                                    key={user._id ?? index}
                                    className="h-[45px] xl:h-[50px] 2xl:h-[65px] border-b border-[#fafbff]"
                                >
                                    <TableCell className="pl-5 w-[35%] text-sm  ">{user.name}</TableCell>
                                    <TableCell className="w-[30%]">
                                        <div className="flex gap-2 items-center text-[13px] font-semibold">
                                            <Image
                                                src="/images/user-management/mail-icon.png"
                                                width={16}
                                                height={16}
                                                alt="phone"
                                            />
                                            {user.email}
                                        </div>
                                    </TableCell>
                                    <TableCell className="w-[25%] pl-[35px] ">
                                        <div className="flex gap-2 items-center text-sm">
                                            <Image
                                                src="/images/user-management/call.svg"
                                                width={16}
                                                height={16}
                                                alt="phone"
                                            />
                                            {user.phone || "N/A"}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-[50px] w-[20%]">
                                        <Button
                                            variant="outline"
                                            disabled={role === "admin"}
                                            size="icon"
                                            className=" bg-transparent rounded-[10px] hover:text-white   hover:bg-[#26C0E2] border border-[#26C0E2] text-[#26C0E2] h-[30px] xl:h-[30px] 2xl:h-[30px] w-[75px] p-0"
                                            onClick={() => onDelete?.(user._id, user.role)}
                                        >
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 h-[65px]">
                                    <span className="text-gray-500 text-sm">No users found</span>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end gap-2 mt-[20px] w-full px-4 bg-transparent">
                {[...Array(totalPages)].map((_, i) => (
                    <Button
                        key={i}
                        className={`rounded-[14px] text-base font-medium h-[35px] w-[40px] xl:h-[40px] ${currentPage === i + 1
                            ? "bg-[#34C759] text-white hover:text-white"
                            : "bg-[#F5F6F7] text-black hover:text-black"
                            }`}
                        variant="outline"
                        onClick={() => onPageChange?.(i + 1)}
                    >
                        {i + 1}
                    </Button>
                ))}
                <Button
                    className="bg-[#F5F6F7] text-base font-medium text-black rounded-[14px] w-[107px] gap-2 h-[35px]  xl:h-[40px]"
                    variant="ghost"
                    onClick={() => onPageChange?.(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                    <RightArrow fillColor="black" width={12} height={12} />
                </Button>
            </div>
        </div>
    );
}
