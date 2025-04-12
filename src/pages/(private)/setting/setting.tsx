"use client";

import React from "react";
import Tabs from "./tabs/tabs";
import AccountSetting from "./account-setting/account-setting";

export default function Setting({ tab }: { tab?: string }) {
    const getTab = () => {
        if (tab === "account-settings") {
            return <AccountSetting />;
        } else if (tab === "connected-accounts") {
            return <div>Connected Accounts</div>;
        } else {
            return (
                <div className="flex items-center px-[43px] bg-white h-[229px] ">
                    <Tabs />
                </div>
            );
        }
    };

    return <div className="h-full">{getTab()}</div>;
}
