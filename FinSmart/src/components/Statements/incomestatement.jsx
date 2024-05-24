import React, { useState, useEffect } from "react";
import MonthlyFilter from "../Homepage/MonthlyFilter";
import styled from "styled-components";
import "../../App.css";

const StatementContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 40px;
  width: 600px;
  height: 100%;
  box-shadow: 0px 5px 10px 0px rgba(255, 40, 223, 0.5),
    0 0 20px rgba(255, 255, 255, 0.2);
  background: linear-gradient(-90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(-90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(
      transparent 3px,
      transparent 3px,
      transparent 78px,
      transparent 78px
    ),
    linear-gradient(-90deg, transparent 1px, transparent 1px),
    linear-gradient(
      -90deg,
      transparent 3px,
      transparent 3px,
      transparent 78px,
      transparent 78px
    ),
    linear-gradient(transparent 1px, transparent 1px), transparent;
  background-size: 10px 10px, 10px 10px, 10px 10px, 10px 10px, 10px 10px,
    10px 10px, 10px 10px, 10px 10px;
`;
const Timelines = styled.select`
  background: #4e236e;
  font-size: 13px;
  font-family: "Inconsolata", monospace;
  font-optical-sizing: auto;
  font-weight: light;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  text-align: center;
  height: 19px;
  border-radius: 9px;
  box-shadow: inset 0 0 7px rgba(255, 16, 211, 0.5);

  border: none;
  outline: none;
  &:hover {
    cursor: pointer;
  }
  .decorated option:hover {
    box-shadow: 0 0 10px 100px #1882a8 inset;
  }
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

  // Function to get unique categories
  const getUniqueCategories = () => {
    const categories = expenseData.map((expense) => expense.category);
    return [...new Set(categories)];
  };

  // Function to get unique subcategories for a category
  const getUniqueSubcategories = (category) => {
    const subcategories = expenseData
      .filter((expense) => expense.category === category)
      .map((expense) => expense.subcategory);
    return [...new Set(subcategories)];
  };

  // Function to filter expense data by category and subcategory
  const getExpensesByCategoryAndSubcategory = (category, subcategory) => {
    return expenseData.filter(
      (expense) =>
        expense.category === category && expense.subcategory === subcategory
    );
  };

  // Function to calculate total expenses for a category
 const calculateCategoryTotal = (category) => {
   return expenseData
     .filter((expense) => expense.category === category)
     .reduce((total, expense) => total + parseInt(expense.amount), 0)
     .toLocaleString();
 };
const months = [
  "Select Month",
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

  return (
    <div>
      <h4 className="incomeStatementLabel">Personal Income Statement</h4>
      <div className="statementFilteringRow">
        <h5 className="statementSortingLabel">Statement Period: </h5>
        <Timelines
          id="month"
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </Timelines>
      </div>
      <StatementContainer>
        <div className="statementAligning">
          <div className="statementList">
            <div className="statementRows">
              <h5 className="statementTotals">Total Income </h5>
              <span className="statementTotalValues">
                {parseInt(totalIncome.toFixed(0)).toLocaleString()}Frw
              </span>
            </div>
            <div className="statementRows">
              <h5 className="statementTotals">Total Expenses</h5>
              <span className="statementTotalValues">
                {parseInt(totalExpenses.toFixed(0)).toLocaleString()}Frw
              </span>
            </div>
            <div className="statementRows">
              <h5 className="statementTotals">Net(Income - Expenses)</h5>
              <span className="statementTotalValues">
                {parseInt(netIncome.toFixed(2)).toLocaleString()}Frw
              </span>
            </div>
            <div className="statementRows">
              <h3 className="statementIE">INCOME</h3>
            </div>

            {incomeData.map((income) => (
              <div key={income.id} className="statementRows">
                <h6 className="statementTotals">{income.description} </h6>
                <span className="statementTotalValues">
                  {parseInt(income.amount).toLocaleString()}
                  Frw
                </span>
              </div>
            ))}

            <div className="statementRows">
              <h3 className="statementIE">EXPENDITURES</h3>
            </div>

            {getUniqueCategories().map((category) => (
              <div key={category} className="statementTotals">
                <h5 className="categoryLabels">{category}:</h5>
                {getUniqueSubcategories(category).map((subcategory) => (
                  <div key={subcategory}>
                    <h6 className="subcategoryLabels">{subcategory}:</h6>
                    {getExpensesByCategoryAndSubcategory(
                      category,
                      subcategory
                    ).map((expense) => (
                      <div key={expense.id} className="statementRows">
                        <h5 className="statementTotals">
                          {expense.description}
                        </h5>
                        <span className="statementTotalValues">
                          {parseInt(expense.amount).toLocaleString()}Frw
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="categoryTotal">
                  <h6 className="categoryTotalTitle">Total :</h6>{" "}
                  <span className="categoryTotalValue">
                    {calculateCategoryTotal(category)}Frw
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </StatementContainer>
    </div>
  );
};

export default IncomeStatement;
