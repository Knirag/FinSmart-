import React from "react";
import { RxCross2 } from "react-icons/rx";
const IncomeList = ({ items, deleteItemIncome }) => {
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
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.month}</td>
            <td>{item.description}</td>
            <td>{item.amount}</td>
            <td>{item.account}</td>
            <td>
              <button
                className="deleteItems"
                onClick={() => deleteItemIncome(item.id)}
              >
                <RxCross2 />
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan="4">
            <h4>INCOME TOTAL:</h4>
          </td>
          <td>
            <h4>
              {items
                .reduce((total, item) => total + parseInt(item.amount), 0)
                .toFixed(2)}
            </h4>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default IncomeList;
