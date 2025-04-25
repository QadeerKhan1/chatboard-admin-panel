import CreateNewAdmin from '@/(pages)/(private)/create-new-admin/create-new-admin'
import React from 'react'

export default function Page({
    searchParams,
}: {
    searchParams: { action?: string };
}) {
    return <CreateNewAdmin action={searchParams.action} />;
}