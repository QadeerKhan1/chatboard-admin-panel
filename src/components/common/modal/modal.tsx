import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ModalProps {
    title: string;
    message1: string;
    message2: string;
    imageSrc: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    isLoading?: boolean
}
// Reusable Modal Component
export default function Modal({
    title = "Modal Title",
    message1 = "This is a dynamic modal message.",
    message2 = "",
    imageSrc = "/default-image.png",
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    open,
    setOpen,
    isLoading
}: ModalProps) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>


            <DialogContent

                className="bg-white  shadow-none backdrop-blur-none [&>button]:hidden fixed overflow-visible bg-transparent top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                   w-[90%] max-w-2xl min-h-[402px] border-none rounded-lg flex flex-col items-center justify-center"
            >


                {/* Top Circle Image */}
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[140px] h-[140px] bg-[#F3F4F6] rounded-full flex items-center justify-center shadow-lg border-[15px] border-white">
                    <Image width={0} height={0} src={imageSrc} alt="Icon" className="w-16 h-16" />
                </div>

                {/* SVG Background */}
                <div className="absolute inset-0 w-full h-full -z-10">
                    <svg
                        width="100%" height="100%"
                        viewBox="0 0 686 402"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full object-cover"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M266.416 37.0871C252.828 18.8324 246.035 9.70507 243.224 7.34603C237.457 2.50673 237.608 2.58262 230.283 0.846377C226.713 0 221.225 0 210.251 0H58.8621C40.5779 0 31.4358 0 24.2244 2.98707C14.6091 6.96983 6.96983 14.6091 2.98707 24.2244C0 31.4358 0 40.5779 0 58.8621V343.138C0 361.422 0 370.564 2.98707 377.776C6.96983 387.391 14.6091 395.03 24.2244 399.013C31.4358 402 40.5779 402 58.8621 402H627.138C645.422 402 654.564 402 661.776 399.013C671.391 395.03 679.03 387.391 683.013 377.776C686 370.564 686 361.422 686 343.138V58.8621C686 40.5779 686 31.4358 683.013 24.2244C679.03 14.6091 671.391 6.96983 661.776 2.98707C654.564 0 645.422 0 627.138 0H476.146C465.171 0 459.684 0 456.113 0.846377C448.788 2.58262 448.939 2.50673 443.173 7.34603C440.362 9.70507 433.568 18.8324 419.981 37.0871C403.171 59.6704 375.051 74.4724 343.198 74.4724C311.346 74.4724 283.225 59.6705 266.416 37.0871Z"
                            fill="white"
                        />
                    </svg>
                </div>

                {/* Modal Content */}
                <div className="relative w-full z-10 flex flex-col items-center pt-[50px]  h-[300px] text-center justify-between mt-6 ">
                    <div>
                        <h2 className="font-nunito font-bold text-[26px] xl:text-[28px] 2xl:text-[32px]  leading-[120%] tracking-[0.59px] text-center align-middle">{title}</h2>
                        <p className="text-[#8391A1] mt-5 font-nunito font-medium text-[22px] xl:text-[25px] 2xl:text-[28px] leading-[150%] tracking-[0.59px] text-center align-middle">{message1}
                            <br />
                            <span>{message2}</span>
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-end w-full gap-4 mt-6">
                        <Button disabled={isLoading} variant="ghost" className="px-[30px] h-[50px] rounded-[13px] font-nunito font-normal text-base 2xl:text-[18px] leading-[100%] tracking-[0em] text-center text-[#FF313A]" onClick={() => { setOpen(false); onCancel?.(); }}>
                            {cancelText}
                        </Button>
                        <Button disabled={isLoading} className="bg-[#FF6067] font-nunito font-normal text-base 2xl:text-lg leading-[100%] tracking-[0em] text-center text-white rounded-[13px] h-[50px] px-[30px] " variant="destructive" onClick={() => { setOpen(false); onConfirm?.(); }}>
                            {isLoading ? <span className="loader" /> : confirmText}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
