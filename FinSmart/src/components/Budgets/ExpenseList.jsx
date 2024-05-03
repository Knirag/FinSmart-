import React from "react"; // Corrected import statement
import { RxCross2 } from "react-icons/rx";

const ExpenseList = () => {
  const listExpenseData = JSON.parse(localStorage.getItem("expenseData"));

  const handleDeleteExpense = (expenseId) => {
  const expenses = JSON.parse(localStorage.getItem("expenseData")) || [];
  const updatedExpenses = expenses.filter(
    (expense) => expense.id !== expenseId
  );
  localStorage.setItem("expenseData", JSON.stringify(updatedExpenses));
  const deletedExpense = expenses.find((expense) => expense.id === expenseId);
  if (deletedExpense) {
    const accounts = JSON.parse(localStorage.getItem("accountData")) || [];
    const account = accounts.find((acc) => acc.name === deletedExpense.account);
    if (account) {
      let newAccountBalance =
        parseInt(account.balance) + parseInt(deletedExpense.amount);
      account.balance = newAccountBalance;
      localStorage.setItem("accountData", JSON.stringify(accounts));
    }
  }
  window.location.reload();
};

  const totalExpenses = listExpenseData
    ? listExpenseData
        .reduce((total, expense) => total + parseInt(expense.amount), 0)
        .toFixed(2)
    : "0.00";
  localStorage.setItem("totalExpenses", totalExpenses);
  return (
    <table className="ExpensesTable">
      <thead>
        <tr>
          <th></th>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Account</th>
        </tr>
      </thead>
      <tbody>
        {listExpenseData ? (
          listExpenseData.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.month}</td>
              <td>{expense.description}</td>
              <td>{parseInt(expense.amount).toLocaleString()}Frw</td>
              <td>{expense.category}</td>
              <td>{expense.account}</td>

              <td>
                <button
                  className="deleteItems"
                  onClick={() => handleDeleteExpense(expense.id)}
                >
                  <RxCross2 />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td>Add Budget Data</td>
          </tr>
        )}
        <tr>
          <td colSpan="4">
            <h4>EXPENSE TOTAL:</h4>
          </td>
          <td>
            <h4>{parseInt(totalExpenses).toLocaleString()}Frw</h4>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ExpenseList;
