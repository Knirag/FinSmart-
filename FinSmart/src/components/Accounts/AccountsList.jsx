import React from "react";
import { RxCross2 } from "react-icons/rx";
import "../../App.css";

const ExpenseList = ({ deleteItem }) => {

const listAccountData = JSON.parse(localStorage.getItem("accountData"));

  return (
    <table className="AccountsTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Balance</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {listAccountData ? (
          listAccountData?.map((account) => (
            <tr>
              <td>{listAccountData.name}</td>
              <td>{listAccountData.balance}</td>
              <td>
                <button
                  className="deleteItems"
                  onClick={() => deleteItem(listAccountData.value)}
                >
                  <RxCross2 />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">No account data available</td>
          </tr>
        )}

        <tr>
          {/* <td colSpan="2">
            <h4>TOTAL:</h4>
          </td>
          <td colSpan="1">
            {/* <h4>
              {accountData
                .reduce((total, data) => total + parseInt(data.balance), 0)
                .toFixed(2)}{" "}
              Frw
            </h4> */}
          {/* </td> */}
        </tr>
      </tbody>
    </table>
  );
};

export default ExpenseList;
