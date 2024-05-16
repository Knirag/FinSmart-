import { useEffect, useState } from "react";
import styled from "styled-components";
import "../../App.css";
import MonthlyFilter from "./MonthlyFilter";
import { Doughnut } from "react-chartjs-2";
import ProgressBarComp from "./Progressbar";
import { CiWallet } from "react-icons/ci";
import "chart.js/auto";

const DashboardHeader = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  left: 100px;
  top: 24px;
`;
const DasboardInfo = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  margin: 0 auto;
  margin-top: 90px;
  width: 900px;
  height: 250px;
  background: rgb(59, 10, 84);
  color: "#05f7d3";
  border-radius: 9px;
  box-shadow: 0px 5px 10px 0px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(255, 255, 255, 0.2);
`;

const Dashboard = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
const accountData = JSON.parse(localStorage.getItem("accountData"))
  useEffect(() => {
    const storedTotalIncome = localStorage.getItem("totalIncome");
    const storedTotalExpenses = localStorage.getItem("totalExpenses");

    setTotalIncome(
      storedTotalIncome ? parseInt(storedTotalIncome) : 0
    );
    setTotalExpenses(
      storedTotalExpenses ? parseInt(storedTotalExpenses) : 0
    );
  }, []);

  // Define chart data
  const chartData = {
    labels: ["Expenses", "Income"],
    datasets: [
      {
        label: "",
        data: [totalExpenses, totalIncome],
        backgroundColor: ["rgba(81, 7, 101)", "rgba(69, 145, 245)"],
        borderColor: ["rgba(218, 208, 219)", "rgba(219, 240, 255)"],
      },
    ],
  };
  return (
    <div>
      <div className="totalsAndDonughts">
        <DashboardHeader>
          <h3 className="Acc">My Dashboard</h3>
        </DashboardHeader>
        {/* DONUGHT CHART & TOTAL EXPENSE & INCOME DISPLAY */}
        <MonthlyFilter />

        <div className="budgetData">
          <div className="budgetDataRow">
            <h5 className="labelBudget">Earned:</h5>
            <h5 className="labelBudgetAmount">
              {parseInt(totalIncome).toLocaleString()}Frw
            </h5>
          </div>
          <div className="budgetDataRow">
            <h5 className="labelBudget">Spent: </h5>
            <h5 className="labelBudgetAmount">
              {parseInt(totalExpenses).toLocaleString()}Frw
            </h5>
          </div>
          <div className="budgetDataRow">
            <h5 className="labelBudget">Balance: </h5>
            <h5 className="labelBudgetAmount">
              {parseInt(totalExpenses).toLocaleString()}Frw
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
                  <h5 className="dashboardAccountName">{account.name}</h5>
                </h4>
                <div className="dashboardAccountRows">
                  <h6 className="dashboardAccountField">Current Balance</h6>
                  <span className="dashboardAccountValue">
                    {parseInt(account.balance).toLocaleString()}
                    Frw
                  </span>
                </div>
                <div className="dashboardAccountRows">
                  <h6 className="dashboardAccountField">Opening Balance</h6>
                  <span className="dashboardAccountValue">
                    {parseInt(account.initialBalance).toLocaleString()}Frw
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROGRESS BAR CONTAINER */}
     
        <ProgressBarComp />
     
    </div>
  );
};

export default Dashboard;
