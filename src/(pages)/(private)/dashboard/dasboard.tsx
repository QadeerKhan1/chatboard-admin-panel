'use client'

import React, { useState } from 'react'
import MetricsCard from './metrics-card/metrics-card'
import SuccessRateChart from './success-rate-chart/success-rate-chart'
import ChatLog from './live-chat-logs/live-chat-logs'
import TotalQueriesChart from './total-queries-chart/total-queries-chart'
import UserEngagementChart from './user-engagement/user-engagement'
import ErrorLogs from './error-logs/error-logs'
import ServerStatusCharts from './server-status-chart/server-status-chart'
import { useGetDashboardStatsQuery, useGetRecentActivityQuery } from '@/store/dashboard/dashboard-slice'
import { ActivityItem } from '@/interface/link-icon-props'

export default function Dashboard() {
    const [selectedYear, setSelectedYear] = useState<string>('2025')

    const { data: queryData, isLoading } = useGetRecentActivityQuery({ year: Number(selectedYear) })
    const { data: dashboardData, isLoading: dashboardLoading } = useGetDashboardStatsQuery()
    const loading = isLoading || dashboardLoading
    const dashboardStates = dashboardData?.data
    const chartData = queryData?.data ?? []


    // Check if data exists before extracting
    const totalQueries = dashboardStates?.totalQueries || 0;
    const activeUsers = dashboardStates?.activeUsers || 0;
    const successRate = Math.round(dashboardStates?.successRate || 0) || 0;
    const systemHealth = dashboardStates?.systemHealth || "No data";


    const metrics = [
        {
            iconUrl: '/images/dashboard/total-query.svg',
            value: `${totalQueries}+`,
            label: "Total Queries",
            textColor: "text-orange-500",
        },
        {
            iconUrl: '/images/dashboard/active-user.svg',
            value: `${activeUsers}`,
            label: "Active Users",
            textColor: "text-blue-600",
        },
        {
            iconUrl: "/images/dashboard/success-rate.svg",
            value: `${successRate}% (positive)`,
            label: "Success Rate",
            textColor: "text-yellow-600",
        },
        {
            iconUrl: "/images/dashboard/system-health.svg",
            value: `${systemHealth}`,
            label: "System Health",
            textColor: "text-green-600",
        },
    ];
    function getDowntimeAgo(timestamp: string) {
        const diff = Date.now() - new Date(timestamp).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        return `${hrs}h ago`;
    }



    return (
        <div className="relative w-full h-full">
            {/* Loading Overlay */}
            {loading && (
                <div className="absolute top-0 left-0 w-full h-full z-30   flex items-center justify-center">
                    <span className="pageLoader"></span>
                </div>
            )}

            {/* Dashboard content with dimmed effect when loading */}
            <div className={`space-y-[20px] pb-[20px] relative z-0 ${loading ? "opacity-70 pointer-events-none" : ""}`}>
                <MetricsCard metrics={metrics} />
                <div className='flex gap-[20px]'>
                    <TotalQueriesChart
                        selectedYear={selectedYear}
                        onYearChange={setSelectedYear}
                        data={chartData as unknown as ActivityItem[]}
                    />
                    <UserEngagementChart userEngagement={dashboardStates?.userEngagement} />
                </div>
                <section className='flex gap-[20px] '>
                    <SuccessRateChart successRate={dashboardStates?.successRate ?? 0} />
                    <ChatLog chatLogs={dashboardStates?.chatLogs ?? []} />
                </section>
                <section className='flex gap-[20px] '>
                    <ServerStatusCharts
                        uptime={dashboardStates?.uptimePercentage}
                        responseTime={dashboardStates?.averageResponseTime}
                        downtime={getDowntimeAgo(dashboardStates?.lastDownTime ?? '')}
                    />

                    <ErrorLogs logs={dashboardStates?.errorLogsList ?? []} />
                </section>
            </div>
        </div>

    )
}
