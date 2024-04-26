import React from 'react';
import styled from "styled-components";

const Timelines = styled.select`
  background: rgb(59, 10, 84);
  height: 20px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #e1e9fc;
  font-size: 10px;
  justify-content: flex-end;
  position: relative;
  right: 170px;
  top: 100px;
  border-radius: 1.5px;
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.5);
position: absolute;
  &:hover {
    cursor: pointer;
  }
`;

const MonthlyFilter = ({ filterItem, selectedMonth }) => {
  const months = ["January", "February", "March", "April","May","June","July","August","September","October","November","December"];
  return (
    <Timelines
      name=""
      id=""
      mb-3
       onChange={(event) => filterItem(event.target.value)}
    >
      {
        months.map((month)=> (
          <option key={month} value={month}>{month}</option>
        ))
      }
    </Timelines>
  );
};

export default MonthlyFilter;