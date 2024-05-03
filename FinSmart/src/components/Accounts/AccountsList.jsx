import React from "react";
import { RxCross2 } from "react-icons/rx";
import "../../App.css";

const AccountsList = () => {

const listAccountData = JSON.parse(localStorage.getItem("accountData"));

const handleDeleteAccount = (accountId) => {
    const accounts = JSON.parse(localStorage.getItem("accountData"));
    const updatedAccounts = accounts.filter(
      (account) => account.id !== accountId
    );
    localStorage.setItem("accountData", JSON.stringify(updatedAccounts));
        window.location.reload();

};
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
            <tr key={account.id}>
              <td>{account.name}</td>
              <td>{parseInt(account.balance).toLocaleString()}Frw</td>
              <td>
                <button
                  className="deleteItems"
                  onClick={() => handleDeleteAccount(account.id)}
                >
                  <RxCross2 />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">Add Account Data</td>
          </tr>
        )}

        <tr></tr>
      </tbody>
    </table>
  );
};

export default AccountsList;
