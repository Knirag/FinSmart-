import React, { useState } from "react";
import { GoTrash } from "react-icons/go";
import styled from "styled-components";
import { MdHistoryToggleOff } from "react-icons/md";
// import { RiArrowDropDownFill } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import moment from "moment";
import "../../App.css";
const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 90px;
  width: 900px;
  height: 100%;
  background: rgb(59, 10, 84);
  color: "#05f7d3";
  border-radius: 9px;
  box-shadow: 0px 5px 10px 0px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(255, 255, 255, 0.2);
`;

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

  const expenseHistory = JSON.parse(localStorage.getItem("expenseHistory"));

  return (
    <div className="accountsListingContainer">
      {listAccountData ? (
        listAccountData.map((account) => (
          <AccountInfo key={account.id}>
            <div className="accountListing">
              <div className="acctHeading">
                <h4 className="acctName">
                  <GrMoney />
                  <h5 className="acctNameLabel">{account.name}</h5>
                </h4>
                {/* opens aact History modal */}
                <button className="acctHistory">
                  <MdHistoryToggleOff />
                  <h6 className="historyBtnLabel">History</h6>
                </button>
              </div>
              <div className="acctDetailRow">
                <h4 className="acctDetailsHeadings">Account Type:</h4>
                <span className="acctDetails">{account.accttype}</span>
              </div>
              <div className="acctDetailRow">
                <h4 className="acctDetailsHeadings">Current Balance:</h4>
                <span className="acctDetails">
                  {parseInt(account.balance).toLocaleString()}Frw
                </span>
              </div>
              <div className="acctDetailRow">
                <h4 className="acctDetailsHeadings">Opening Balance:</h4>
                <span className="acctDetails">
                  {parseInt(account.initialBalance).toLocaleString()}Frw
                </span>
              </div>
              <div className="acctDetailRow">
                <h4 className="acctDetailsHeadings">Date Created:</h4>
                <span className="acctDetails">
                  {moment(account.date).format("MMMM Do YYYY")}
                </span>
              </div>
              <button
                className="deleteItems"
                onClick={() => handleDeleteAccount(account.id)}
              >
                <GoTrash />
                <h6 className="historyBtnLabel">DELETE</h6>
              </button>
            </div>
          </AccountInfo>
        ))
      ) : (
        <AccountInfo>
          <h4 className="infoMessage">Click the + Icon to Create Account</h4>
        </AccountInfo>
      )}
    </div>
  );
};

export default AccountsList;
