"use client";

import { useState, useEffect } from "react";

export function ServerStatusChart({ uptime = 99.5, responseTime = 120, downtime = "05:20 PM" }) {
    // Define base sizes for calculations
    const maxOuterRadius = 120; // Max size for uptime circle
    const maxMiddleRadius = 90;  // Max size for responseTime circle
    const minInnerRadius = 90;   // Fixed size for downtime circle

    // Normalize values
    const uptimeRadius = Math.max(40, (uptime / 100) * maxOuterRadius);
    const responseRadius = Math.max(30, (responseTime / 200) * maxMiddleRadius);
    const downtimeRadius = minInnerRadius; // Fixed

    // **Calculate Gaps Dynamically**
    // Ensure there is always a minimum 20px gap
    const adjustedResponseRadius = Math.min(responseRadius, uptimeRadius - 20);
    const adjustedDowntimeRadius = Math.min(downtimeRadius, adjustedResponseRadius - 20);

    return (
        <div className="flex items-center gap-6 bg-white p-[25px]">
            {/* Left Side Stats */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-semibold">Server Status</span>
                    <span className="text-green-500">● Active</span>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                        <span className="text-gray-600">Upcoming Percentage</span>
                    </div>
                    <p className="text-lg font-bold">{uptime}%</p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                        <span className="text-gray-600">Response Time</span>
                    </div>
                    <p className="text-lg font-bold">{responseTime}ms</p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                        <span className="text-gray-600">Last Downtime</span>
                    </div>
                    <p className="text-lg font-bold">{downtime}</p>
                </div>
            </div>

            {/* Right Side Chart */}
            <div className="relative w-[244px] h-[245px]">
                {/* Yellow Circle - Uptime */}
                <svg width="244" height="245" viewBox="0 0 244 245" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute">
                    <circle cx="122" cy="122.967" r={uptimeRadius} stroke="url(#paint0_linear_yellow)" strokeWidth="3.40465" />
                    <defs>
                        <linearGradient id="paint0_linear_yellow" x1="46.5302" y1="54.3063" x2="64.1209" y2="231.348" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FFD66B" stopOpacity="0" />
                            <stop offset="1" stopColor="#FFD66B" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Orange Circle - Response Time */}
                <svg width="186" height="186" viewBox="0 0 186 186" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute"
                    style={{ top: `${(maxOuterRadius - adjustedResponseRadius) / 2}px`, left: `${(maxOuterRadius - adjustedResponseRadius) / 2}px` }}>
                    <circle cx="92.7821" cy="93.2865" r={adjustedResponseRadius} transform="rotate(85.3939 92.7821 93.2865)" stroke="url(#paint0_linear_orange)" strokeWidth="3.40465" />
                    <defs>
                        <linearGradient id="paint0_linear_orange" x1="65.2899" y1="137.753" x2="55.285" y2="8.29288" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FB896B" stopOpacity="0" />
                            <stop offset="1" stopColor="#FB896B" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Purple Circle - Last Downtime */}
                <svg width="126" height="127" viewBox="0 0 126 127" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute"
                    style={{ top: `${(maxMiddleRadius - adjustedDowntimeRadius) / 2}px`, left: `${(maxMiddleRadius - adjustedDowntimeRadius) / 2}px` }}>
                    <circle cx="63" cy="63.9668" r={adjustedDowntimeRadius} stroke="url(#paint0_linear_purple)" strokeWidth="3.40465" />
                    <defs>
                        <linearGradient id="paint0_linear_purple" x1="49.3814" y1="63.3993" x2="37.4651" y2="6.08769" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#6956E5" stopOpacity="0" />
                            <stop offset="0.976403" stopColor="#6956E5" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
}
