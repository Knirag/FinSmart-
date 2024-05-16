import React, { useState, useEffect } from "react";
import MonthlyFilter from "../Homepage/MonthlyFilter";
import styled from "styled-components";
import "../../App.css";

const StatementContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 90px;
  width: 700px;
  height: 100%;
  background: #3d035e;
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
    const totalIncome = parseInt(localStorage.getItem("totalIncome")) || 0;
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
      <h4 className="incomeStatementLabel">Personal Income Statement</h4>
      <StatementContainer>
        <h5 className="topRow">Total Income: </h5>
        <span className="finValues">
          {parseInt(totalIncome.toFixed(0)).toLocaleString()}Frw
        </span>
        <h5 className="topRow">Total Expenses</h5>
        <span className="finValues">
          {parseInt(totalExpenses.toFixed(0)).toLocaleString()}Frw
        </span>
        <h5 className="topRow">Net (Income - Expenses):</h5>
        <span className="finValues">
          {parseInt(netIncome.toFixed(2)).toLocaleString()}Frw
        </span>
      </StatementContainer>

      <StatementContainer>
        <div className="incomeBox">
          <h3 className="budgetTitle">
            <i>INCOME</i>
          </h3>

          {incomeData.map((income) => (
            <div key={income.id}>
              <p className="financialInfo">
                ●{income.description} -{" "}
                {parseInt(income.amount).toLocaleString()}
                Frw
              </p>
            </div>
          ))}
        </div>
      </StatementContainer>
      <StatementContainer>
        <h3 className="budgetTitle">EXPENSES</h3>
        {/* Housing */}
        <h5 className="categoryLabels">Housing:</h5>
        {getExpensesByCategory("Housing").map((expense) => (
          <div key={expense.id}>
            <p className="financialInfo">
              ●{expense.description} -{" "}
              {parseInt(expense.amount).toLocaleString()}Frw
            </p>
          </div>
        ))}

        {/* Utilities */}
        <h5 className="categoryLabels">Utilities:</h5>
        {getExpensesByCategory("Utilities").map((expense) => (
          <div key={expense.id}>
            <p className="financialInfo">
              ●{expense.description} -{" "}
              {parseInt(expense.amount).toLocaleString()}Frw
            </p>
          </div>
        ))}

        {/* Transport */}
        <h5 className="categoryLabels">Transport:</h5>
        {getExpensesByCategory("Transport").map((expense) => (
          <div key={expense.id}>
            <p className="financialInfo">
              ●{expense.description} -{" "}
              {parseInt(expense.amount).toLocaleString()}Frw
            </p>
          </div>
        ))}

        {/* Savings & Investment */}
        <h5 className="categoryLabels">Savings & Investment:</h5>
        {getExpensesByCategory("Savings").map((expense) => (
          <div key={expense.id}>
            <p className="financialInfo">
              ●{expense.description} -{" "}
              {parseInt(expense.amount).toLocaleString()}Frw
            </p>
          </div>
        ))}

        {/* Groceries */}
        <h5 className="categoryLabels">Groceries:</h5>
        {getExpensesByCategory("Groceries").map((expense) => (
          <div key={expense.id}>
            <p className="financialInfo">
              ●{expense.description} -{" "}
              {parseInt(expense.amount).toLocaleString()}Frw
            </p>
          </div>
        ))}

        {/* Education */}
        <h5 className="categoryLabels">Education:</h5>
        {getExpensesByCategory("Education").map((expense) => (
          <div key={expense.id}>
            <p className="financialInfo">
              ●{expense.description} -{" "}
              {parseInt(expense.amount).toLocaleString()}Frw
            </p>
          </div>
        ))}

        {/* Entertainment */}
        <h5 className="categoryLabels">Entertainment:</h5>
        {getExpensesByCategory("Entertainment").map((expense) => (
          <div key={expense.id}>
            <p className="financialInfo">
              ●{expense.description} -{" "}
              {parseInt(expense.amount).toLocaleString()}Frw
            </p>
          </div>
        ))}

        {/* Shopping */}
        <h5 className="categoryLabels">Shopping:</h5>
        {getExpensesByCategory("Shopping").map((expense) => (
          <div key={expense.id}>
            <p className="financialInfo">
              ●{expense.description} {parseInt(expense.amount).toLocaleString()}
              Frw
            </p>
          </div>
        ))}
      </StatementContainer>
    </div>
  );
};

export default IncomeStatement;
