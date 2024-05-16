import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import styled from "styled-components";

const LineChart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 45px;
  width: 900px;
  height: 100%;
  background: rgb(59, 10, 84);
  color: "#05f7d3";
  border-radius: 9px;
  box-shadow: 0px 5px 10px 0px rgba(40, 241, 255, 0.5),
    0 0 20px rgba(255, 255, 255, 0.2);
`;


const Item = styled.div`
  display: flex;
  justify-content:flex-start;
  align-items: center;
  margin: 4px;
`;
const StyledProgressBar = styled(ProgressBar)`
  width: 600px;
  display: flex;
  align-items: center;
  margin: 6px;
  flex: 1px;
`;

const ProgressBarComp = () => {
  const [categoryPercentages, setCategoryPercentages] = useState({});
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expenseData, setExpenseData] = useState([]);
  const categoryData = JSON.parse(localStorage.getItem("categoryData")) || [];

  useEffect(() => {
    const storedExpenseData =
      JSON.parse(localStorage.getItem("expenseData")) || [];
    setExpenseData(storedExpenseData);

    // Calculate total expenses
    const total = storedExpenseData.reduce(
      (acc, expense) => acc + parseInt(expense.amount),
      0
    );
    setTotalExpenses(total);

    // Calculate percentages for each category
    const updatedCategoryPercentages = {};
    categoryData.forEach((category) => {
      const categoryTotal = storedExpenseData
        .filter((expense) => expense.category === category.name)
        .reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
      updatedCategoryPercentages[category.name] = (categoryTotal / total) * 100;
    });
    setCategoryPercentages(updatedCategoryPercentages);
  }, [expenseData, categoryData]);

  return (
    <LineChart>
      {categoryData.map((category) => (
        <Item key={category.id}>
          <h6 className="budgetLabels">{category.name}:</h6>
          <StyledProgressBar
            completed={
              categoryPercentages[category.name] > 100
                ? 100
                : categoryPercentages[category.name]?.toFixed(0)
            }
            bgColor="linear-gradient(90deg, rgba(102,19,161,0.9641981792717087) 0%, rgba(181,52,174,0.68968837535014) 35%, rgba(0,202,255,0.5160189075630253) 100%)"
            height="12px"
            labelClassName="label"
            baseBgColor="#e0cee6"
          />
        </Item>
      ))}
    </LineChart>
  );
};

export default ProgressBarComp;
