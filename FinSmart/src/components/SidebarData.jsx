import React from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as GrIcons from "react-icons/gr";
export const SidebarData = [
  {
    title: "My Dashboard",
    path: "/dashboard",
    icon: <RiIcons.RiDashboardFill />,
  },
  {
    title: "Budgets",
    path: "/budgets",
    icon: <IoIcons.IoIosPaper />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Accounts",
    path: "/accounts",
    icon: <GrIcons.GrMoney />,
  },
  {
    title: "Statements",
    path: "/statement",
    icon: <FaIcons.FaPaperclip />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
];
