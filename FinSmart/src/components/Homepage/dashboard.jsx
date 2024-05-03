import { useEffect, useState } from "react";
// import { ProgressBar } from "primereact/progressbar";
import styled from "styled-components";
import "../../App.css";
import MonthlyFilter from "./MonthlyFilter";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
  
const DasboardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
const LineChart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 90px;
  width: 900px;
  height: 100%;
  background: rgb(59, 10, 84);
  color: "#05f7d3";
  border-radius: 9px;
  box-shadow: 0px 5px 10px 0px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(255, 255, 255, 0.2);
`;
const Dashboard = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const storedTotalIncome = localStorage.getItem("totalIncome");
    const storedTotalExpenses = localStorage.getItem("totalExpenses");

    setTotalIncome(storedTotalIncome ? parseInt(storedTotalIncome) : 0);
    setTotalExpenses(storedTotalExpenses ? parseInt(storedTotalExpenses) : 0);
  }, []);

  // Define chart data
  const chartData = {
    labels: ["", ""],
    datasets: [
      {
        label: "",
        data: [totalExpenses, totalIncome],
        backgroundColor: ["81, 7, 101)", "rgba(69, 145, 245)"],
        borderColor: ["rgba(218, 208, 219)", "rgba(219, 240, 255)"],
      },
    ],
  };
  return (
    <div>
      <DasboardInfo>
        <MonthlyFilter />
        <div className="budgetData">
          <h5>Earned</h5>
          <h5>{totalIncome}Frw</h5>
          <h5>Spent: </h5>
          <h5>{totalExpenses}Frw</h5>
        </div>
        <div className="dataCardcategoryCard">
          <Doughnut
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  align: "start",
                  fontSize: 20,
                  color: "black",
                },
                cutoutPercentage: 80,
              },
            }}
          />
        </div>
      </DasboardInfo>
      <LineChart>
        <h4>Budget:</h4>
      </LineChart>
    </div>
  );
};

export default Dashboard;
