import React, { useState, useEffect } from "react";
import { GoTrash } from "react-icons/go";
import styled from "styled-components";
import { MdHistoryToggleOff } from "react-icons/md";
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
    0 0 20px rgba(255, 255, 255, 0.2), inset 0 0 10px hsl(310, 100%, 54%),
    0 0 40px #9e25d69d, 0 0 80px #d553f9ab;
`;

const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(49, 49, 49, 0.8);
  position: fixed;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: rgb(59, 10, 84);
  padding: 14px 28px;
  border-radius: 3px;
  min-height: 100px;
  min-width: 300px;
  box-shadow: 0px 5px 10px 0px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(255, 255, 255, 0.2), inset 0 0 10px hsl(310, 100%, 54%),
    0 0 40px #9e25d69d, 0 0 80px #d553f9ab;
`;

const AccountsList = () => {
  const [modal, setModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const accountData = JSON.parse(localStorage.getItem("accountData")) || [];
    const expenseData = JSON.parse(localStorage.getItem("expenseData")) || [];
    const incomeData = JSON.parse(localStorage.getItem("incomeData")) || [];

    const updatedAccounts = accountData.map((account) => {
      const todayExpenses = expenseData.filter((expense) => {
        const expenseDate = moment(expense.date);
        return (
          expense.account === account.name &&
          expenseDate.isSameOrBefore(moment(), "day")
        );
      }
    );
    const todayIncome = incomeData.filter((income) => {
        const incomeDate = moment(income.date);
        return (
          income.account === account.name &&
          incomeDate.isSameOrBefore(moment(), "day")
        );
      });
const totalIncomeToday = todayIncome.reduce(
  (sum, income) => sum + parseInt(income.amount),
  0
);
      const totalExpensesToday = todayExpenses.reduce(
        (sum, expense) => sum + parseInt(expense.amount),
        0
      );
      const updatedBalance = account.initialBalance - totalExpensesToday 
      + totalIncomeToday;

      return {
        ...account,
        balance: updatedBalance,
      };
    });

    setAccounts(updatedAccounts);
    localStorage.setItem("accountData", JSON.stringify(updatedAccounts));
  }, []);

  const toggleModal = (account) => {
    setModal(!modal);
    if (!modal) {
      document.body.classList.add("active-modal");
      setSelectedAccount(account);
      fetchTransactionHistory(account.name);
    } else {
      document.body.classList.remove("active-modal");
      setSelectedAccount(null);
      setTransactionHistory([]);
    }
  };

  const fetchTransactionHistory = (accountName) => {
    const expenseHistory =
      JSON.parse(localStorage.getItem("expenseHistory")) || [];
    const incomeHistory =
      JSON.parse(localStorage.getItem("incomeHistory")) || [];

    const filteredExpenses = expenseHistory.filter(
      (transaction) => transaction.accountName === accountName
    );

    const filteredIncomes = incomeHistory.filter(
      (transaction) => transaction.accountName === accountName
    );

    const combinedHistory = [
      ...filteredExpenses.map((expense) => ({
        ...expense,
        type: "expense",
        date: new Date(expense.expenseDate),
      })),
      ...filteredIncomes.map((income) => ({
        ...income,
        type: "income",
        date: new Date(income.incomeDate),
      })),
    ].sort((a, b) => b.date - a.date);

    setTransactionHistory(combinedHistory);
  };

  const handleDeleteAccount = (accountName) => {
    const updatedAccounts = accounts.filter(
      (account) => account.name !== accountName
    );
    setAccounts(updatedAccounts);
    localStorage.setItem("accountData", JSON.stringify(updatedAccounts));
    window.location.reload();
  };

  return (
    <div className="accountsListingContainer">
      {accounts.length > 0 ? (
        accounts.map((account) => (
          <AccountInfo key={account.name}>
            <div className="accountListing">
              <div className="acctHeading">
                <h4 className="acctName">
                  <GrMoney />
                  <h5 className="acctNameLabel">{account.name}</h5>
                </h4>
                {/* opens account History modal */}
                <button
                  className="acctHistory"
                  onClick={() => toggleModal(account)}
                >
                  <MdHistoryToggleOff />
                  <h6 className="historyBtnLabel">History</h6>
                </button>
                {modal && selectedAccount?.name === account.name && (
                  <Modal>
                    <Overlay>
                      <ModalContent>
                        <div className="accountHistoryList">
                          <div className="accountHistoryHeading">
                            <h6 className="accountName">
                              {selectedAccount.name} Transaction History:
                            </h6>
                          </div>
                          <div className="accountHistoryRow">
                            <h6 className="transactionHistoryLabel">
                              Date Created:
                            </h6>
                            <span className="transactionHistoryData">
                              {moment(selectedAccount.date).format(
                                "MMMM Do YYYY"
                              )}
                            </span>
                          </div>
                          <div className="accountHistoryRow">
                            <h6 className="transactionHistoryLabel">
                              Current Balance:
                            </h6>
                            <span className="transactionHistoryData">
                              {parseInt(
                                selectedAccount.balance
                              ).toLocaleString()}{" "}
                              Frw
                            </span>
                          </div>
                          <div className="accountHistoryRow">
                            <h6 className="transactionHistoryLabel">
                              Opening Balance:
                            </h6>
                            <span className="transactionHistoryData">
                              {parseInt(
                                selectedAccount.initialBalance
                              ).toLocaleString()}{" "}
                              Frw
                            </span>
                          </div>
                          <div className="acctHeading">
                            <h5 className="acctName">History:</h5>
                          </div>
                          {transactionHistory.length > 0 ? (
                            transactionHistory.map((transaction, index) => (
                              <ol key={index}>
                                <li className="accountHistoryRow">
                                  <span className="transactionInfo">
                                    {moment(transaction.date).format(
                                      "MMMM Do YYYY"
                                    )}
                                    -
                                  </span>
                                  <span className="transactionInfo">
                                    {transaction.expenseDescription ||
                                      transaction.incomeDescription}
                                    -
                                  </span>
                                  <span className="transactionInfo">
                                    {transaction.type === "expense" ? "-" : "+"}
                                    {parseInt(
                                      transaction.amount
                                    ).toLocaleString()}{" "}
                                    Frw
                                  </span>
                                </li>
                              </ol>
                            ))
                          ) : (
                            <p>No transactions found.</p>
                          )}
                        </div>
                        {/* Button */}
                        <button className="close-modal" onClick={toggleModal}>
                          Close
                        </button>
                      </ModalContent>
                    </Overlay>
                  </Modal>
                )}
              </div>
              <div className="acctDetailRow">
                <h4 className="acctDetailsHeadings">Account Type:</h4>
                <span className="acctDetails">{account.accttype}</span>
              </div>
              <div className="acctDetailRow">
                <h4 className="acctDetailsHeadings">Current Balance:</h4>
                <span className="acctDetails">
                  {parseInt(account.balance).toLocaleString()} Frw
                </span>
              </div>
              <div className="acctDetailRow">
                <h4 className="acctDetailsHeadings">Opening Balance:</h4>
                <span className="acctDetails">
                  {parseInt(account.initialBalance).toLocaleString()} Frw
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
                onClick={() => handleDeleteAccount(account.name)}
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
