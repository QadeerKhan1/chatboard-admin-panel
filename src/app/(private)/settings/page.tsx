// app/(private)/setting/page.tsx
import React from "react";
import Setting from "@/pages/(private)/setting/setting"; // your client component

export default function SettingPage({
    searchParams,
}: {
    searchParams: { tab?: string };
}) {
    return <Setting tab={searchParams.tab} />;
}
