import { chatHistoryIcon } from "@/components/sidebar/sidebar-icons/chat-history-icon";
import { createNewAdmin } from "@/components/sidebar/sidebar-icons/create-new-admin";
import { dashboardIcon } from "@/components/sidebar/sidebar-icons/dashboard-icon";
import { SettingsIcon } from "@/components/sidebar/sidebar-icons/settings-icon";
import { userManagementIcon } from "@/components/sidebar/sidebar-icons/user-management-icon";

export const SIDEBAR_LINKS_DATA = [
  {
    icon: dashboardIcon,
    text: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: userManagementIcon,
    text: "User Management",
    link: "/user-management",
  },

  {
    icon: chatHistoryIcon,
    text: "Chat History",
    link: "/chat-history",
  },
  {
    icon: SettingsIcon,
    text: "Settings",
    link: "/settings",
  },

  {
    icon: createNewAdmin,
    text: "Create New Admin",
    link: "/create-new-admin",
  },
];
