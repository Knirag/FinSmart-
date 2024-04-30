import React from "react";
import MonthlyFilter from "../Homepage/MonthlyFilter";

const IncomeStatement = ({ data }) => {
  // Define income statement data structure
  const { revenue, costOfGoodsSold, operatingExpenses, netIncome } = data;

  const calculateGrossProfit = () => {
    return revenue - costOfGoodsSold;
  };

  const calculateOperatingIncome = () => {
    return calculateGrossProfit() - operatingExpenses;
  };

  return (
    <div className="income-statement">
      <MonthlyFilter/>
      <h2>Income Statement</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Revenue</td>
            <td>{revenue}</td>
          </tr>
          <tr>
            <td>Cost of Goods Sold</td>
            <td>({costOfGoodsSold})</td>
          </tr>
          <tr>
            <td>Gross Profit</td>
            <td>{calculateGrossProfit()}</td>
          </tr>
          <tr>
            <td>Operating Expenses</td>
            <td>({operatingExpenses})</td>
          </tr>
          <tr>
            <td>Operating Income</td>
            <td>{calculateOperatingIncome()}</td>
          </tr>
          <tr>
            <td>Net Income</td>
            <td>{netIncome}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IncomeStatement;
