import React from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as GrIcons from "react-icons/gr";
export const SidebarData = [
  {
    title: 'My Dashboard',
    path: '/Dashboard',
    icon: <RiIcons.RiDashboardFill />,
  },
  {
    title: 'Budgets',
    path: '/budgets',
    icon: <IoIcons.IoIosPaper />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'January',
        path: '/budgets/January',
        cName: 'sub-nav',
      },
      {
        title: 'February',
        path: '/budgets/February',
        cName: 'sub-nav',
      },
      {
        title: 'March',
        path: '/budgets/March',
        cName: 'sub-nav',
      },
      {
        title: 'April',
        path: '/budgets/April',
        cName: 'sub-nav',
      },
      {
        title: 'May',
        path: '/budgets/May',
        cName: 'sub-nav',
      },
      {
        title: 'June',
        path: '/budgets/June',
        cName: 'sub-nav',
      },
      {
        title: 'July',
        path: '/budgets/July',
        cName: 'sub-nav',
      },
      {
        title: 'August',
        path: '/budgets/August',
        cName: 'sub-nav',
      },
      {
        title: 'September',
        path: '/budgets/September',
        cName: 'sub-nav',
      },
      {
        title: 'October',
        path: '/budgets/October',
        cName: 'sub-nav',
      },
      {
        title: 'November',
        path: '/budgets/November',
      },
      {
        title: 'December',
        path: '/budgets/December',
      },
    ],
  },
  {
    title: 'Accounts',
    path: '/Accounts',
    icon: <GrIcons.GrMoney />,
  },
  {
    title: 'Statements',
    path: '/budget:month//IncomeStatement',
    icon: <FaIcons.FaPaperclip />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'January',
        path: '/January/IncomeStatement',
      },
      {
        title: 'February',
        path: '/February/IncomeStatement',
      },
      {
        title: 'March',
        path: '/March/IncomeStatement',
      },
      {
        title: 'April',
        path: '/April/IncomeStatement',
      },
      {
        title: 'May',
        path: '/May/IncomeStatement',
      },
      {
        title: 'June',
        path: '/June/IncomeStatement',
      },
      {
        title: 'July',
        path: '/July/IncomeStatement',
      },
      {
        title: 'August',
        path: '/August/IncomeStatement',
      },
      {
        title: 'September',
        path: '/September/IncomeStatement',
      },
      {
        title: 'October',
        path: '/October/IncomeStatement',
      },
      {
        title: 'November',
        path: '/November/IncomeStatement',
      },
      {
        title: 'December',
        path: '/December/IncomeStatement',
      },
    ],
  },
];
