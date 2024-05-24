import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import moment from "moment";

const TransactionsHeader = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  left: 100px;
  top: 24px;
`;

const TransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 15px;
  width: 600px;
  height: 100%;
  background: #340251;
  color: "#05f7d3";
  border-radius: 3px;
  box-shadow: inset 0px 5px 10px 0px rgba(203, 15, 255, 0.5),
    0 0 20px rgba(255, 255, 255, 0.2);
`;


const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState("all"); 
  const [selectedMonth, setSelectedMonth] = useState(moment().month());

  useEffect(() => {
    const expenseData = JSON.parse(localStorage.getItem("expenseData")) || [];
    const incomeData = JSON.parse(localStorage.getItem("incomeData")) || [];

    // Add type property to each transaction
    const typedExpenseData = expenseData.map((expense) => ({
      ...expense,
      type: "expense",
    }));
    const typedIncomeData = incomeData.map((income) => ({
      ...income,
      type: "income",
    }));

    const combinedData = [...typedExpenseData, ...typedIncomeData];
    const sortedData = combinedData.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    setTransactions(sortedData);
  }, []);

const filteredTransactions = transactions.filter((transaction) => {
  const transactionMonth = moment(transaction.date).month();
  if (filterType === "all") return transactionMonth === selectedMonth;
  return transaction.type === filterType && transactionMonth === selectedMonth;
});

const handlePreviousMonth = () => {
  setSelectedMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
};

const handleNextMonth = () => {
  setSelectedMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
};

const renderAmount = (amount, type) => {
  const sign = type === "income" ? "+" : "-";
  return `${sign}${parseInt(amount).toLocaleString()} Frw`;
};

  const months = [
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
      <TransactionsHeader>
        <h3 className="Acc">Transactions</h3>
      </TransactionsHeader>
      <div className="transactionFiltering">
        <div className="monthlyFiltering">
          <button onClick={handlePreviousMonth} className="monthTransitionBtn">
            <TiChevronLeftOutline />
          </button>
          <h4 className="transactionMonthValue">{months[selectedMonth]}</h4>
          <button className="monthTransitionBtn" onClick={handleNextMonth}>
            <TiChevronRightOutline />
          </button>
        </div>
        <div className="transactionTypeFiltering">
          <button
            onClick={() => setFilterType("expense")}
            className="transactionFilterBtn"
          >
            <h6>Expense Only</h6>
          </button>
          <button
            onClick={() => setFilterType("income")}
            className="transactionFilterBtn"
          >
            <h6>Income Only</h6>
          </button>
          <button
            onClick={() => setFilterType("all")}
            className="transactionFilterBtn"
          >
            <h6>All</h6>
          </button>
        </div>
      </div>

      {filteredTransactions.map((transaction) => (
        <TransactionContainer key={transaction.id}>
          <div className="transactionLabel">
            <h4 className="transactionName">{transaction.description}</h4>
            <span className="transactionValueAmount">
              {renderAmount(transaction.amount, transaction.type)}
            </span>
          </div>
          <div className="transactionRow">
            <span className="transactionValue">{transaction.account}</span>
            <span className="transactionValue">
              {moment(transaction.date).format("MMMM Do YYYY")}
            </span>
          </div>
        </TransactionContainer>
      ))}
    </div>
  );
};

export default Transactions;
