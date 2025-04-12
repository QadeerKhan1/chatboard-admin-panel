'use client'
import React from 'react'
import MetricsCard from './metrics-card/metrics-card'
import SuccessRateChart from './success-rate-chart/success-rate-chart'
import ChatLog from './live-chat-logs/live-chat-logs'
import TotalQueriesChart from './total-queries-chart/total-queries-chart'
import UserEngagementChart from './user-engagement/user-engagement'
import ErrorLogs from './error-logs/error-logs'
import ServerStatusCharts from './server-status-chart/server-status-chart'
import { useSession } from 'next-auth/react'

export default function Dashboard() {
    const cookies = useSession();
    console.log(cookies, 'session')
    return (
        <div className='space-y-[20px]'>
            <MetricsCard />
            <div className='flex gap-[20px]'>
                <TotalQueriesChart />
                <UserEngagementChart />
            </div>
            <section className='flex gap-[20px] '>
                <SuccessRateChart />
                <ChatLog />
            </section>
            <section className='flex gap-[20px] '>
                <ServerStatusCharts />
                <ErrorLogs />
            </section>

        </div>
    )
}
