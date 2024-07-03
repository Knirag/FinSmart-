import React, { useState, useEffect, useRef } from "react";
import { PiDownloadSimpleLight } from "react-icons/pi";
import axios from "axios";
import { baseUrl } from "../../utils";
import moment from "moment";
import { utils, writeFile } from "xlsx";
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

const IncomeStatement = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const currentMonth = moment().format("MMMM");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);


  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("authToken");
      try {
        const [expenseRes, incomeRes, accountRes] = await Promise.all([
          axios.get(`${baseUrl}/expense`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          axios.get(`${baseUrl}/income`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          axios.get(`${baseUrl}/accounts`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
        ]);
        setExpenseData(expenseRes.data);
        setIncomeData(incomeRes.data);
        setAccountData(accountRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filterDataByMonth = (data) => {
    return data.filter((item) => {
      const itemStartDate = moment(item.date);
      const itemEndDate = item.endDate
        ? moment(item.endDate)
        : moment(item.date);
      const startMonth = itemStartDate.month() ;
      console.log(startMonth);
      const endMonth = itemEndDate.month() ;
      const selected = months.indexOf(selectedMonth);
      if (
        startMonth === selected  ||
        endMonth === selected ||
        (startMonth < selected && endMonth > selected)
      ) {
        return true;
      }
      return false;
    });
  };

  const filteredIncomeData = filterDataByMonth(incomeData);
  const filteredExpenseData = filterDataByMonth(expenseData);

  const totalIncome = () => {
    return filteredIncomeData
      .reduce((total, income) => total + parseInt(income.incomeAmount), 0)
      .toFixed(2);
  };

  const totalExpenses = () => {
    return filteredExpenseData
      .reduce((total, expense) => total + parseInt(expense.expenseAmount), 0)
      .toFixed(2);
  };

  const balance = () => {
    return (totalIncome() - totalExpenses()).toFixed(2);
  };

  const getUniqueCategories = () => {
    const categories = filteredExpenseData.map(
      (expense) => expense.category.categoryName
    );
    return [...new Set(categories)];
  };

  const getUniqueSubcategories = (category) => {
    const subcategories = filteredExpenseData
      .filter((expense) => expense.category.categoryName === category)
      .map((expense) => expense.subCategory.subCategoryName);
    return [...new Set(subcategories)];
  };

  const getExpensesByCategoryAndSubcategory = (category, subcategory) => {
    return filteredExpenseData.filter(
      (expense) =>
        expense.category.categoryName === category &&
        expense.subCategory.subCategoryName === subcategory
    );
  };

  const calculateCategoryTotal = (category) => {
    return filteredExpenseData
      .filter((expense) => expense.category.categoryName === category)
      .reduce((total, expense) => total + parseInt(expense.expenseAmount), 0)
      .toLocaleString();
  };
 const exportToExcel = () => {
   const incomeSheet = utils.json_to_sheet(
     filteredIncomeData.map((income) => ({
       Description: income.incomeDescription,
       Amount: income.incomeAmount,
       Date: income.incomeDate,
     }))
   );

   const expenseSheet = utils.json_to_sheet(
     filteredExpenseData.map((expense) => ({
       Description: expense.expenseDescription,
       Amount: expense.expenseAmount,
       Date: expense.expenseDate,
       Category: expense.category.categoryName,
       Subcategory: expense.subCategory.subCategoryName,
     }))
   );

   const wb = utils.book_new();
   utils.book_append_sheet(wb, incomeSheet, "Income");
   utils.book_append_sheet(wb, expenseSheet, "Expenses");

   writeFile(wb, "finSmartIncomeStatement.xlsx");
 };
  return (
    <div>
      <h4 className="incomeStatementLabel">Personal Income Statement</h4>
      <div className="statementFilteringRow">
        <h5 className="statementSortingLabel">Statement Period: </h5>
        <Timelines
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </Timelines>
      </div>
      <div className="export-button-cont">
      <button className="exportButton" onClick={exportToExcel}>
        <PiDownloadSimpleLight />
        Export
      </button>
      </div>
      <StatementContainer >
        <div className="statementAligning">
          <div className="statementList">
            <div className="statementRows">
              <h5 className="statementTotals">Total Income </h5>
              <span className="statementTotalValues">
                {parseInt(totalIncome()).toLocaleString()}
              </span>
            </div>
            <div className="statementRows">
              <h5 className="statementTotals">Total Expenses</h5>
              <span className="statementTotalValues">
                {parseInt(totalExpenses()).toLocaleString()}
              </span>
            </div>
            <div className="statementRows">
              <h5 className="statementTotals">Net(Income - Expenses)</h5>
              <span className="statementTotalValues">
                {parseInt(balance()).toLocaleString()} Frw
              </span>
            </div>
            <div className="statementRows">
              <h3 className="statementIE">INCOME</h3>
            </div>

            {filteredIncomeData.map((income) => (
              <div key={income.incomeId} className="statementRows">
                <h6 className="statementTotals">{income.incomeDescription} </h6>
                <span className="statementTotalValues">
                  {parseInt(income.incomeAmount).toLocaleString()}
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
                          {expense.expenseDescription}
                        </h5>
                        <span className="statementTotalValues">
                          {parseInt(expense.expenseAmount).toLocaleString()}Frw
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
