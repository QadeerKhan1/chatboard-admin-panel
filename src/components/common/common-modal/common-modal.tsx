"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function CustomModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {/* Open Modal Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
                Open Modal
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="relative bg-white w-full max-w-md p-6 rounded-lg shadow-lg overflow-hidden">
                        {/* Background SVG */}
                        <div className="absolute inset-0 -z-10 opacity-20">
                            <svg width="100%" height="100%" viewBox="0 0 686 402" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M266.416 37.0871C252.828 18.8324 246.035 9.70507 243.224 7.34603C237.457 2.50673 237.608 2.58262 230.283 0.846377C226.713 0 221.225 0 210.251 0H58.8621C40.5779 0 31.4358 0 24.2244 2.98707C14.6091 6.96983 6.96983 14.6091 2.98707 24.2244C0 31.4358 0 40.5779 0 58.8621V343.138C0 361.422 0 370.564 2.98707 377.776C6.96983 387.391 14.6091 395.03 24.2244 399.013C31.4358 402 40.5779 402 58.8621 402H627.138C645.422 402 654.564 402 661.776 399.013C671.391 395.03 679.03 387.391 683.013 377.776C686 370.564 686 361.422 686 343.138V58.8621C686 40.5779 686 31.4358 683.013 24.2244C679.03 14.6091 671.391 6.96983 661.776 2.98707C654.564 0 645.422 0 627.138 0H476.146C465.171 0 459.684 0 456.113 0.846377C448.788 2.58262 448.939 2.50673 443.173 7.34603C440.362 9.70507 433.568 18.8324 419.981 37.0871C403.171 59.6704 375.051 74.4724 343.198 74.4724C311.346 74.4724 283.225 59.6705 266.416 37.0871Z"
                                    fill="white"
                                />
                            </svg>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                        >
                            <X size={24} />
                        </button>

                        {/* Modal Content */}
                        <h2 className="text-gray-800 text-xl font-semibold">Custom Modal</h2>
                        <p className="text-gray-600 mt-2">
                            This is a fully custom modal with your SVG as a background.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
