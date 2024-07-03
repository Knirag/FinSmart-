import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { baseUrl } from "../../utils";
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
  width: 700px;
  height: 80px;
  background: #420466;
  color: #05f7d3;
  border-radius: 3px;
  box-shadow: inset 0px 5px 10px 0px rgba(255, 15, 219, 0.5),
    0 0 20px rgba(255, 255, 255, 0.2);
`;
const TransactionTotalRow = styled.div`
  display: flex;
  margin: 0 auto;
  width: 600px;
  justify-content: space-around;
  margin-top: 10px;
`;
const TotalsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  padding: 2px 6px;
  width: 200px;
  gap: 14px;
  border: 2px solid #380e6b;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  box-shadow: inset 0px 1px 5px 3px rgba(137, 16, 193, 0.71),
    0 0 20px rgba(239, 188, 219, 0.043);
`;

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState(moment().month());

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const [incomeResponse, expenseResponse] = await Promise.all([
          axios.get(`${baseUrl}/income`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }),
          axios.get(`${baseUrl}/expense`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }),
        ]);

        const combinedData = [
          ...incomeResponse.data.map((income) => ({
            id: income.incomeId,
            description: income.incomeDescription,
            date: income.incomeDate,
            amount: income.incomeAmount,
            account: income.account.accountName,
            isRecurring: income.incomeFrequency,
            endDate: income.endDate,
            type: "income",
          })),
          ...expenseResponse.data.map((expense) => ({
            id: expense.expenseId,
            description: expense.expenseDescription,
            date: expense.expenseDate,
            amount: expense.expenseAmount,
            account: expense.account.accountName,
            isRecurring: expense.expenseFrequency,
            endDate: expense.endDate,
            type: "expense",
          })),
        ];

        const sortedData = combinedData.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setTransactions(sortedData);
      } catch (err) {
        console.log("Unable to fetch data:", err);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionStartMonth = moment(transaction.date).month();
    const transactionEndMonth = transaction.endDate
      ? moment(transaction.endDate).month()
      : transactionStartMonth;

    if (filterType === "all") {
      return (
        selectedMonth >= transactionStartMonth &&
        selectedMonth <= transactionEndMonth
      );
    }

    return (
      transaction.type === filterType &&
      selectedMonth >= transactionStartMonth &&
      selectedMonth <= transactionEndMonth
    );
  });

  const handlePreviousMonth = () => {
    setSelectedMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
  };

  const handleNextMonth = () => {
    setSelectedMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
  };

  const renderAmount = (amount) => {
    return `${parseInt(amount).toLocaleString()} Frw`;
  };
  const calculateTotalIncome = () => {
    return filteredTransactions
      .filter((transaction) => transaction.type === "income")
      .reduce((total, income) => (total += parseInt(income.amount)), 0);
  };
  const calculateTotalExpenses = () => {
    return filteredTransactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, expense) => (total += parseInt(expense.amount)), 0);
  };

  const totalIncome = calculateTotalIncome();
  const totalExpenses = calculateTotalExpenses();

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
            onClick={() => setFilterType("income")}
            className="transactionFilterBtn"
          >
            Income Only
          </button>
          <button
            onClick={() => setFilterType("expense")}
            className="transactionFilterBtn"
          >
            Expense Only
          </button>
          <button
            onClick={() => setFilterType("all")}
            className="transactionFilterBtn"
          >
            All
          </button>
        </div>
        <TransactionTotalRow>
          <TotalsContainer>
            <h5 className="total-trans">Total Income:</h5>
            <span className="total-trans-amount"> {totalIncome}</span>
          </TotalsContainer>
          <TotalsContainer>
            <h5 className="total-trans">Total Expenses:</h5>
            <span className="total-trans-amount">{totalExpenses}</span>
          </TotalsContainer>
        </TransactionTotalRow>
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
