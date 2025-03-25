import React from 'react'
import MetricsCard from './metrics-card/metrics-card'
import { SuccessRateChart } from './success-rate-chart/success-rate-chart'
import ChatLog from './live-chat-logs/live-chat-logs'
import { TotalQueriesChart } from './total-queries-chart/total-queries-chart'
import { UserEngagementChart } from './user-engagement/user-engagement'
import ErrorLogs from './error-logs/error-logs'
import { ServerStatusChart } from './server-status-chart/server-status-chart'

export default function Dashboard() {
    return (
        <div className='space-y-[25px]'>
            <MetricsCard />
            <div className='flex gap-[25px]'>
                <TotalQueriesChart />
                <UserEngagementChart />
            </div>
            <section className='flex gap-[25px] '>
                <SuccessRateChart />
                <ChatLog />
            </section>
            <section className='flex gap-[25px] '>
                <ServerStatusChart />
                <ErrorLogs />
            </section>

        </div>
    )
}
