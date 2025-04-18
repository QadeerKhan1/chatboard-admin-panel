"use client";

import React from "react";
import AccountSetting from "./account-setting/account-setting";

export default function Setting() {
    // const getTab = () => {
    //     if (tab === "account-settings") {
    //         return <AccountSetting />;
    //     } else if (tab === "connected-accounts") {
    //         return <div>Connected Accounts</div>;
    //     } else {
    //         return (
    //             <div className="flex items-center px-[43px] bg-white ">
    //                 <Tabs />
    //             </div>
    //         );
    //     }
    // };

    return <div className=""><AccountSetting /></div>;
}
