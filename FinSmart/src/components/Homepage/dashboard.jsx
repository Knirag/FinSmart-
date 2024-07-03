import { useEffect, useState, useMemo } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
import { baseUrl } from "../../utils";
import styled from "styled-components";
import "../../App.css";
import { Doughnut } from "react-chartjs-2";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import lineChartBg from "../../images/LineChartBg.png";
import { CiWallet } from "react-icons/ci";
import moment from "moment";
import "chart.js/auto";

const DashboardHeader = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  left: 100px;
  top: 24px;
`;

const Timelines = styled.select`
  background: #4e236e;
  font-size: 13px;
  font-family: "Inconsolata", monospace;
  font-optical-sizing: auto;
  font-weight: light;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  text-align: center;
  height: 19px;
  border-radius: 3px;
  box-shadow: inset 0 0 7px rgba(224, 43, 237, 0.5) ;

  border: none;
  outline: none;
  &:hover {
    cursor: pointer;
  }
  .decorated option:hover {
    box-shadow: 0 0 10px 100px #1882a8 inset;
  }
`;
const  Sorting = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
position: absolute;
right: 200px;
top:70px;
`;
const ReminderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 100px;
  width: 900px;
  height: 100%;
  background: rgb(59, 10, 84);
  border-radius: 9px;
  box-shadow: 0px 5px 10px 0px rgba(162, 40, 255, 0.644),
    0 0 20px rgba(255, 255, 255, 0.2);
`;
const TodayExpense = styled.div`
  display: flex;
  flex-direction: column;
  `;
  const TodayIncome = styled.div`
    display: flex;
    flex-direction: column;
  `;
const LineChart = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 15px;
  width: 900px;
  height: 100%;
  background: rgb(59, 10, 84);
  background-image: url(${lineChartBg});
  background-size: contain;
  background-blend-mode: luminosity;
  background-position: right;
  background-repeat: no-repeat, repeat;
  object-fit: fill;
  border-radius: 9px;
  box-shadow: 0px 5px 10px 0px rgba(40, 241, 255, 0.5),
    0 0 20px rgba(255, 255, 255, 0.2);
`;

const Item = styled.div`
  display: flex;
 flex-direction: column;
`;

const StyledProgressBar = styled(ProgressBar)`
  width: 600px;
  height: 20px;
  display: flex;
  align-items: center;
`;
const months = [
  "Select Month",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Dashboard = () => {
   const [incomeData, setIncomeData] = useState([]);
   const [expenseData, setExpenseData] = useState([]);
   const [accountData, setAccountData] = useState([]);
   const currentMonth = moment().format("MMMM");
   const [selectedMonth, setSelectedMonth] = useState(currentMonth);
   const [categoryPercentages, setCategoryPercentages] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("authToken");
      try {
        const [expenseRes, incomeRes, accountRes] = await Promise.all([
          axios.get(`${baseUrl}/expense`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          axios.get(`${baseUrl}/income`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          axios.get(`${baseUrl}/accounts`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
        ]);
        setExpenseData(expenseRes.data);
        setIncomeData(incomeRes.data);
        setAccountData(accountRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filterDataByMonth = (data) => {
    if (selectedMonth === "Select Month") {
      return data;
    }
    return data.filter((item) => {
      const itemDate = new Date(item.incomeDate || item.expenseDate);
      return itemDate.getMonth() === months.indexOf(selectedMonth) - 1;
    });
  };

 const filteredIncomeData = useMemo(
   () => filterDataByMonth(incomeData),
   [incomeData, selectedMonth]
 );
 const filteredExpenseData = useMemo(
   () => filterDataByMonth(expenseData),
   [expenseData, selectedMonth]
 );

  const totalIncome = () => {
    return filteredIncomeData
      .reduce((total, income) => total + parseFloat(income.incomeAmount), 0)
      .toFixed(2);
  };

  const totalExpenses = () => {
    return filteredExpenseData
      .reduce((total, expense) => total + parseFloat(expense.expenseAmount), 0)
      .toFixed(2);
  };

  const balance = () => {
    return (totalIncome() - totalExpenses()).toFixed(2);
  };

  // Calculate category percentages
  useEffect(() => {
    console.log("Calculating category percentages");
    if (!filteredExpenseData || !Array.isArray(filteredExpenseData)) {
      setCategoryPercentages({});
      return;
    }

    const updatedCategoryPercentages = {};
    const totalExpensesAmount = filteredExpenseData.reduce(
      (total, expense) => total + parseFloat(expense.expenseAmount),
      0
    );

    if (totalExpensesAmount === 0) {
      setCategoryPercentages({});
      return;
    }

    filteredExpenseData.forEach((expense) => {
      const categoryName = expense.category.categoryName;
      if (!updatedCategoryPercentages[categoryName]) {
        updatedCategoryPercentages[categoryName] = 0;
      }
      updatedCategoryPercentages[categoryName] += parseFloat(
        expense.expenseAmount
      );
    });

    for (const category in updatedCategoryPercentages) {
      updatedCategoryPercentages[category] =
        (updatedCategoryPercentages[category] / totalExpensesAmount) * 100;
    }

    console.log("Category Percentages:", updatedCategoryPercentages);
    setCategoryPercentages(updatedCategoryPercentages);
  }, [filteredExpenseData]);

const todayExpenses = useMemo(() => {
  return expenseData.filter((exp) =>
    moment(exp.expenseDate).isSame(moment(), "day")
  );
}, [expenseData]);

const todayIncome = useMemo(() => {
  return incomeData.filter((inc) =>
    moment(inc.incomeDate).isSame(moment(), "day")
  );
}, [incomeData]);

  const chartData = {
    labels: ["Expenses", "Income"],
    datasets: [
      {
        label: "",
        data: [totalExpenses(), totalIncome()],
        backgroundColor: ["rgba(81, 7, 101)", "rgba(69, 145, 245)"],
        borderColor: ["rgba(218, 208, 219)", "rgba(219, 240, 255)"],
      },
    ],
  };

  return (
    <div>
      <DashboardHeader>
        <h3 className="Acc">My Dashboard</h3>
      </DashboardHeader>
      <Sorting>
        <Timelines
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </Timelines>
      </Sorting>
      {/* REMINDERS */}
      <ReminderContainer>
        <h5 className="reminder-Label">Today's Reminders</h5>
        {todayExpenses.map((exp) => (
          <TodayExpense key={exp.expenseId}>
            <div className="reminder-Expense-Row">
              <div className="expReminder-Label">
                <i className="expReminder-Label-Icon">
                  <FaArrowTrendDown />
                </i>
                <h6 className="expReminder-Label-Name">
                  {exp.expenseDescription}
                </h6>
              </div>
            </div>
            <span className="expReminder-Amount">
              -{parseInt(exp.expenseAmount).toLocaleString()} Frw
            </span>
            <div className="reminder-Expense-Row">
              <span className="expReminder-Date">
                {moment(exp.expenseDate).format("MMMM Do YYYY")}
              </span>
            </div>
          </TodayExpense>
        ))}
        {todayIncome.map((inc) => (
          <TodayIncome key={inc.incomeId}>
            <div className="reminder-Expense-Row">
              <div className="expReminder-Label">
                <i className="expReminder-Label-Icon">
                  <FaArrowTrendUp />
                </i>
                <h6 className="incReminder-Label-Name">
                  {inc.incomeDescription}
                </h6>
              </div>
              <span className="expReminder-Amount">
                +{parseInt(inc.incomeAmount).toLocaleString()} Frw
              </span>
            </div>
            <div className="reminder-Expense-Row">
              <span className="expReminder-Date">
                {moment(inc.incomeDate).format("MMMM Do YYYY")}
              </span>
            </div>
          </TodayIncome>
        ))}
      </ReminderContainer>
      <div className="totalsAndDonughts">
        {/* DONUT CHART & TOTAL EXPENSE & INCOME DISPLAY */}
        <br />
        <div className="budgetData">
          <div className="budgetDataRow">
            <h5 className="labelBudget">Earned:</h5>
            <h5 className="labelBudgetAmount">
              {parseInt(totalIncome()).toLocaleString()} Frw
            </h5>
          </div>
          <div className="budgetDataRow">
            <h5 className="labelBudget">Spent:</h5>
            <h5 className="labelBudgetAmount">
              {parseInt(totalExpenses()).toLocaleString()} Frw
            </h5>
          </div>
          <div className="budgetDataRow">
            <h5 className="labelBudget">Balance:</h5>
            <h5 className="labelBudgetAmount">
              {parseInt(balance()).toLocaleString()} Frw
            </h5>
          </div>
        </div>

        <div className="dataCardCategoryCard">
          <div className="doughnutComponent">
            <Doughnut
              data={chartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    align: "start",
                    fontSize: 15,
                    color: "#fff",
                    align: "center",
                  },
                  cutoutPercentage: 80,
                },
              }}
            />
          </div>
        </div>
        {/* ACCOUNTS CONTAINER */}
        <div className="dashboardAccountSection">
          <h4 className="accountDashboardLabel">Accounts</h4>
          {accountData?.map((account) => (
            <div key={account.id}>
              <div className="accountDashboardContainer">
                <h4 className="dashboardAccountHeading">
                  <CiWallet />
                  <h5 className="dashboardAccountName">
                    {account.accountName}
                  </h5>
                </h4>
                <div className="dashboardAccountRows">
                  <h6 className="dashboardAccountField">Current Balance</h6>
                  <span className="dashboardAccountValue">
                    {parseInt(account.accountBalance).toLocaleString()} Frw
                  </span>
                </div>
                <div className="dashboardAccountRows">
                  <h6 className="dashboardAccountField">Opening Balance</h6>
                  <span className="dashboardAccountValue">
                    {parseInt(account.accountInitialBalance).toLocaleString()}{" "}
                    Frw
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROGRESS BAR CONTAINER */}
      <LineChart>
        <h5 className="reminder-Label">Spending:</h5>
        {Object.keys(categoryPercentages).map((category) => (
          <Item key={category}>
            <div className="prog-category-Name">
              <h6 className="budgetLabel">{category}</h6>
            </div>
            <div className="progress-bar">
              <StyledProgressBar
                completed={
                  categoryPercentages[category] > 100
                    ? 100
                    : categoryPercentages[category]?.toFixed(0)
                }
                bgColor="linear-gradient(90deg, rgba(29,0,36,1) 0%, rgba(73,0,127,1) 35%, rgba(168,0,255,1) 100%)"
                height="12px"
                labelClassName="label"
                labelAlignment="outside"
                baseBgColor="#e0cee6"
              />
            </div>
          </Item>
        ))}
      </LineChart>
    </div>
  );
};

export default Dashboard;
