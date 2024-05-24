import React from "react"; // Corrected import statement
import { GoTrash } from "react-icons/go";
import { BsDashCircleDotted } from "react-icons/bs";
import styled from "styled-components";
import moment from "moment";

const BudgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 43px;
  width: 900px;
  height: 100%;
  background: rgb(59, 10, 84);
  color: "#05f7d3";
  border-radius: 9px;
  box-shadow: 0px 5px 10px 0px rgba(255, 78, 78, 0.5),
    0 0 20px rgba(255, 0, 0, 0.2);
`;
const ExpenseList = ({ selectedCategory }) => {
  const listExpenseData = JSON.parse(localStorage.getItem("expenseData"));

  const filteredExpenses = listExpenseData
    ? selectedCategory
      ? listExpenseData.filter(
          (expense) => expense.category === selectedCategory
        )
      : listExpenseData
    : [];
  
    const getExpenseHistory = () => {
    return JSON.parse(localStorage.getItem("expenseHistory")) || [];
  };

  const handleDeleteExpense = (expenseId) => {
    const expenses = JSON.parse(localStorage.getItem("expenseData")) || [];
    const expenseHistory = getExpenseHistory();

    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== expenseId
    );
    localStorage.setItem("expenseData", JSON.stringify(updatedExpenses));

    const deletedExpense = expenses.find((expense) => expense.id === expenseId);

    if (deletedExpense) {
      const accounts = JSON.parse(localStorage.getItem("accountData")) || [];
      const account = accounts.find(
        (acc) => acc.name === deletedExpense.account
      );
      if (account) {
        let newAccountBalance =
          parseInt(account.balance) + parseInt(deletedExpense.amount);
        account.balance = newAccountBalance;
        localStorage.setItem("accountData", JSON.stringify(accounts));
      }

      const updatedExpenseHistory = expenseHistory.filter(
        (history) => history.id !== expenseId
      );
      localStorage.setItem(
        "expenseHistory",
        JSON.stringify(updatedExpenseHistory)
      );
    }

    // Reload the page to reflect changes
    window.location.reload();
  };

  const totalExpenses = listExpenseData
    ? listExpenseData
        .reduce((total, expense) => total + parseInt(expense.amount), 0)
        .toFixed(2)
    : "0.00";
  localStorage.setItem("totalExpenses", totalExpenses);
  return (
    <div className="ExpensesTable">
      {listExpenseData ? (
        listExpenseData.map((expense) => (
          <BudgetContainer key={expense.id}>
            <div className="expenseList">
              <div className="expenseHeading">
                <h4 className="expenseTitle">
                  <BsDashCircleDotted />
                  <h5 className="expenseNameLabel">{expense.description}</h5>
                </h4>
                <div className="expenseBalanceTransaction">
                  <div className="checkbox-wrapper-39">
                    <label>
                      <input type="checkbox" />
                      <span className="checkbox"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="expenseRow">
                <h5 className="expenseLabel">Amount:</h5>
                <span className="expenseValue">
                  {parseInt(expense.amount).toLocaleString()}Frw
                </span>
              </div>
              <div className="expenseRow">
                <h5 className="expenseLabel">Category:</h5>

                <span className="expenseValue">{expense.category}</span>
              </div>
              <div className="expenseRow">
                <h5 className="expenseLabel">Sub-Category:</h5>

                <span>{expense.subcategory}</span>
              </div>
              <div className="expenseRow">
                <h5 className="expenseLabel">Account:</h5>

                <span className="expenseValue">{expense.account}</span>
              </div>
              <div className="expenseRow">
                <h5 className="expenseLabel">Date:</h5>
                <span className="expenseValue">
                  {moment(expense.date).format("MMMM Do YYYY")}
                </span>
              </div>

              <button
                className="deleteItems"
                onClick={() => handleDeleteExpense(expense.id)}
              >
                <GoTrash />
                <h6 className="historyBtnLabel">DELETE</h6>
              </button>
            </div>
          </BudgetContainer>
        ))
      ) : (
        <BudgetContainer>
          <h5>Add Budget Data</h5>
        </BudgetContainer>
      )}
    </div>
  );
};

export default ExpenseList;
