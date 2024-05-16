import React,
{useState} from 'react';
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
  right: 187px;
  top: 80px;
  border-radius: 1.5px;
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.5);
position: absolute;
  &:hover {
    cursor: pointer;
  }
`;

const MonthlyFilter = () => {
  const months = [
    "",
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
 
const [selectedCategory, setSelectedCategory] = useState("");

const handleCategoryChange = (e) => {
  const category = e.target.value;
  setSelectedCategory(category);
  onChangeCategory(category);
};
  const expenseData = JSON.parse(localStorage.getItem("expenseData")) || [];
  const categories = [
    ...new Set(expenseData.map((expense) => expense.category)),
  ];
  return (
    <Timelines
      id="category"
      value={selectedCategory}
      onChange={handleCategoryChange}
    >
      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </Timelines>
  );
};

export default MonthlyFilter;