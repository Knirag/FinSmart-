import React from "react";
import { RxCross2 } from "react-icons/rx";
const IncomeList = () => {
  const listIncomeData = JSON.parse(localStorage.getItem("incomeData"));
  
  const handleDeleteIncome = (incomeId) => {
    const incomes = JSON.parse(localStorage.getItem("incomeData"));
    const updatedIncomes = incomes.filter((income) => income.id !== incomeId);
    localStorage.setItem("incomeData", JSON.stringify(updatedIncomes));
    window.location.reload(); 
  };
const totalIncome = listIncomeData
? listIncomeData
    .reduce(
      (total, income) => total + parseInt(income.amount),
      0
    )
    .toFixed(2)
: "0.00";
localStorage.setItem("totalIncome", totalIncome);
  return (
    <table className="ExpensesTable">
      <thead>
        <tr>
          <th></th>
          <th>Description</th>
          <th>Amount</th>
          <th>Account</th>
        </tr>
      </thead>
      <tbody>
        {listIncomeData ? (
          listIncomeData.map((income) => (
            <tr key={income.id}>
              <td>{income.month}</td>
              <td>{income.description}</td>
              <td>{income.amount}Frw</td>
              <td>{income.account}</td>
              <td>
                <button
                  className="deleteItems"
                  onClick={() => handleDeleteIncome(income.id)}
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
            <h4>INCOME TOTAL:</h4>
          </td>
          <td>
            <h4>{totalIncome} Frw</h4>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default IncomeList;
