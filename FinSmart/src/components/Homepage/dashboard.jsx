import React from 'react';
import styled from "styled-components";
import "../../App.css";
import MonthlyFilter from './MonthlyFilter';
import ProgressBar from 'react-bootstrap/esm/ProgressBar';

const DasboardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 90px;
  width: 900px;
  height: 200px;
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
  height: 200px;
  background: rgb(59, 10, 84);
  color: "#05f7d3";
  border-radius: 9px;
  box-shadow: 0px 5px 10px 0px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(255, 255, 255, 0.2);
`;
const Dashboard = () => {
    const filterItem = (cat) => {
      setExpenses(expenses.filter((expense) => expense.category == cat));
    };
  return (
    <div>
      <DasboardInfo>
        <MonthlyFilter filterItem={filterItem} />
      </DasboardInfo>
      <LineChart>
        <h4>Good </h4>
        <ProgressBar/>
      </LineChart>
    </div>
  );
}

export default Dashboard;