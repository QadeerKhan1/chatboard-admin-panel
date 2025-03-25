"use client";
import DataNotFound from "@/components/common/data-not-found/data-not-found";
import React from "react";
import Tabs from "./tabs/tabs";
import { useSearchParams } from "next/navigation";
import AccountSetting from "./account-setting/account-setting";

export default function Setting() {
    const params = useSearchParams(); // Correct way to get 'tab' param
    const tab = params?.get("tab");
    const getTab = () => {
        if (tab === "account-settings") {
            return <AccountSetting />;
        } else if (tab === "connected-accounts") {
            return <div>Connected Accounts</div>;
        } else {
            return <div className="flex items-center px-[43px] bg-white h-[229px] ">
                <Tabs />
            </div>;
        }
    }
    return (
        <div className="h-full ">
            {getTab()}
        </div>
    );
}
