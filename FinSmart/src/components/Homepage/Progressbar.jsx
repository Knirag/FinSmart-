import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import styled from "styled-components";

const StyledProgressBar = styled(ProgressBar)`
  width: 100%;
  display: block;
  justify-content: center;
  align-items: center;
  padding: -93px;
  margin: 6px;
  margin-right: 600px;
`;

const ProgressBarComp = () => {
  const [categoryPercentages, setCategoryPercentages] = useState({
    Housing: 0,
    Utilities: 0,
    Transport: 0,
    Savings: 0,
    Groceries: 0,
    Education: 0,
    Entertainment: 0,
    Shopping: 0,
    Miscelleneous: 0,
  });

  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expenseData, setExpenseData] = useState([]);

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
    Object.keys(categoryPercentages).forEach((category) => {
      const categoryTotal = storedExpenseData
        .filter((expense) => expense.category === category)
        .reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
      updatedCategoryPercentages[category] = (categoryTotal / total) * 100;
    });
    setCategoryPercentages(updatedCategoryPercentages);
  }, [expenseData]);

  return (
    <div className="progress-bar-container">
      {Object.entries(categoryPercentages).map(([category, percentage]) => (
        <React.Fragment key={category}>
          <h6 className="budgetLabels">{category}</h6>
          <StyledProgressBar
            completed={percentage > 100 ? 100 : percentage.toFixed(0)}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBarComp;
