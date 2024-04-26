import React from "react";

const IncomeStatement = ({ income, expenses }) => {
  const totalIncome = income.reduce((acc, item) => acc + item.amount, 0);
  const totalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);
  const netIncome = totalIncome - totalExpenses;

  return (
    <div className="income-statement">
      <h2>Personal Income Statement</h2>
      <div className="income-section">
        <h3>Income</h3>
        <ul>
          {income.map((item, index) => (
            <li key={index}>
              <span>{item.description}</span>
              <span>${item.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="total">
          <span>Total Income:</span>
          <span>${totalIncome.toFixed(2)}</span>
        </div>
      </div>
      <div className="expense-section">
        <h3>Expenses</h3>
        <ul>
          {expenses.map((item, index) => (
            <li key={index}>
              <span>{item.description}</span>
              <span>${item.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="total">
          <span>Total Expenses:</span>
          <span>${totalExpenses.toFixed(2)}</span>
        </div>
      </div>
      <div className="net-income">
        <h3>Net Income</h3>
        <p>${netIncome.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default IncomeStatement;
