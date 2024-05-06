import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  margin: 6px;
`;
const StyledProgressBar = styled(ProgressBar)`
  width: 600px;
  display: flex;
  align-items: center;
  margin: 6px;
  flex: 1px;
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
    <Container className="progress-bar-container">
      {Object.entries(categoryPercentages).map(([category, percentage]) => (
        <Item key={category}>
          <h6 className="budgetLabels">{category}</h6>
          <StyledProgressBar
            completed={percentage > 100 ? 100 : percentage.toFixed(0)}
            bgColor="  radial-gradient(circle, rgba(207,104,249,0.6746420980501575) 0%, rgba(93,4,255,0.7698801932882529) 100%)"
            height="15px"
            labelClassName="label"
            baseBgColor="#f2d7fc"
          />
        </Item>
      ))}
    </Container>
  );
};

export default ProgressBarComp;