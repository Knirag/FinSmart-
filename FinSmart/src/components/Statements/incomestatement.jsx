import React, { useState, useEffect } from "react";
import MonthlyFilter from "../Homepage/MonthlyFilter";
import styled from "styled-components";

const StatementContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 90px;
  width: 700px;
  height: 100%;
  background: rgb(185, 104, 249);
  background: radial-gradient(
    circle,
    rgba(185, 104, 249, 0.6998521820837711) 0%,
    rgba(70, 38, 94, 1) 100%
  );

  border-radius: 9px;
  box-shadow: 0px 5px 10px 0px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(255, 255, 255, 0.2);
`;

const IncomeStatement = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const storedIncomeData =
      JSON.parse(localStorage.getItem("incomeData")) || [];
    const storedExpenseData =
      JSON.parse(localStorage.getItem("expenseData")) || [];
    setIncomeData(storedIncomeData);
    setExpenseData(storedExpenseData);
    const totalIncome = parseFloat(localStorage.getItem("totalIncome")) || 0;
    setTotalIncome(totalIncome);

    // Retrieve total expenses from local storage
    const totalExpenses =
      parseFloat(localStorage.getItem("totalExpenses")) || 0;
    setTotalExpenses(totalExpenses);
  }, []);
    const netIncome = totalIncome - totalExpenses;

  // Function to filter expense data by category
  const getExpensesByCategory = (category) => {
    return expenseData.filter((expense) => expense.category === category);
  };

  return (
    <div>
      <MonthlyFilter />
      <h4>Monthly Personal Statement</h4>
      <StatementContainer>
        {/* Display totals */}
        <h6 className="topRow">Total Income: </h6>
        <span>{totalIncome.toFixed(2)}</span>
        <h6 className="topRow">Total Expenses</h6>
        <span>{totalExpenses.toFixed(2)}</span>
        <h6 className="topRow">
          Net (Income - Expenses): {netIncome.toFixed(2)}
        </h6>
        <span></span>
        {/* Render each category */}
        <h3>INCOME</h3>

        <h3>EXPENSES</h3>
        {/* Housing */}
        <h5>Housing</h5>
        {getExpensesByCategory("Housing").map((expense) => (
          <div key={expense.id}>
            <p>
              {expense.description} - {expense.amount}
            </p>
          </div>
        ))}

        {/* Utilities */}
        <h5>Utilities</h5>
        {getExpensesByCategory("Utilities").map((expense) => (
          <div key={expense.id}>
            <p>
              {expense.description} - {expense.amount}
            </p>
          </div>
        ))}

        {/* Transport */}
        <h5>Transport</h5>
        {getExpensesByCategory("Transport").map((expense) => (
          <div key={expense.id}>
            <p>
              {expense.description} - {expense.amount}
            </p>
          </div>
        ))}

        {/* Savings & Investment */}
        <h5>Savings & Investment</h5>
        {getExpensesByCategory("Savings").map((expense) => (
          <div key={expense.id}>
            <p>
              {expense.description} - {expense.amount}
            </p>
          </div>
        ))}

        {/* Groceries */}
        <h5>Groceries</h5>
        {getExpensesByCategory("Groceries").map((expense) => (
          <div key={expense.id}>
            <p>
              {expense.description} - {expense.amount}
            </p>
          </div>
        ))}

        {/* Education */}
        <h5>Education</h5>
        {getExpensesByCategory("Education").map((expense) => (
          <div key={expense.id}>
            <p>
              {expense.description} - {expense.amount}
            </p>
          </div>
        ))}

        {/* Entertainment */}
        <h5>Entertainment</h5>
        {getExpensesByCategory("Entertainment").map((expense) => (
          <div key={expense.id}>
            <p>
              {expense.description} - {expense.amount}
            </p>
          </div>
        ))}

        {/* Shopping */}
        <h5>Shopping</h5>
        {getExpensesByCategory("Shopping").map((expense) => (
          <div key={expense.id}>
            <p>
              {expense.description} - {expense.amount}
            </p>
          </div>
        ))}
      </StatementContainer>
    </div>
  );
};

export default IncomeStatement;
