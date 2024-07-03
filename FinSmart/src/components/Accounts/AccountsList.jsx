import React, { useState, useEffect } from "react";
import { GoTrash } from "react-icons/go";
import styled from "styled-components";
import { MdHistoryToggleOff } from "react-icons/md";
import { ImPencil2 } from "react-icons/im";
import axios from "axios";
import { baseUrl } from "../../utils";
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

const AccountsList = ({accountData, toggleModal, sendAccount}) => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [accounts, setAccounts] = useState([])


  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const fetchExpenses = axios.get(`${baseUrl}/expense`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const fetchIncomes = axios.get(`${baseUrl}/income`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    Promise.all([ fetchExpenses, fetchIncomes])
      .then(([expensesRes, incomesRes]) => {
        setExpenseData(expensesRes.data);
        setIncomeData(incomesRes.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);


useEffect(() => {
  if (accounts.length > 0 && incomeData.length > 0 && expenseData.length > 0) {
    const authToken = localStorage.getItem("authToken");

    const updateAccountBalance = async (account) => {
      try {
        await axios.put(`${baseUrl}/accounts/${account.accountId}`, account, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      } catch (error) {
        console.error(`Error updating account ${account.accountId}:`, error);
      }
    };

    const updatedAccounts = accounts.map((account) => {
      const todayExpenses = expenseData.filter((expense) => {
        const expenseDate = moment(expense.expenseDate);
        return (
          expense.account.accountName === account.accountName &&
          expenseDate.isSameOrBefore(moment(), "day")
        );
      });
      const todayIncome = incomeData.filter((income) => {
        const incomeDate = moment(income.incomeDate);
        return (
          income.account.accountName === account.accountName &&
          incomeDate.isSameOrBefore(moment(), "day")
        );
      });
      const totalIncomeToday = todayIncome.reduce(
        (sum, income) => sum + parseInt(income.incomeAmount),
        0
      );
      const totalExpensesToday = todayExpenses.reduce(
        (sum, expense) => sum + parseInt(expense.expenseAmount),
        0
      );
      const updatedBalance =
        account.accountInitialBalance - totalExpensesToday + totalIncomeToday;

      const updatedAccount = {
        ...account,
        accountBalance: updatedBalance,
      };

      updateAccountBalance(updatedAccount);
      return updatedAccount;
    });

    setAccounts(updatedAccounts);
  }
}, [accounts.length, incomeData, expenseData]);

useEffect(() => {
   if (accounts.length > 0 && incomeData.length > 0 && expenseData.length > 0) {
  const processRecurringIncomes = async () => {
    const today = moment();
    const authToken = localStorage.getItem("authToken");

    const updatedAccounts = accounts.map((account) => {
      let newBalance = account.accountBalance;

      incomeData.forEach((income) => {
        if (
          income.incomeFrequency &&
          income.account.accountName === account.accountName
        ) {
          const incomeDate = moment(income.incomeDate);

          if (today.date() === incomeDate.date()) {
            newBalance += parseInt(income.incomeAmount, 10);
          }
        }
      });

expenseData.forEach((expense) => {
  if (
    expense.expenseFrequency &&
    expense.account.accountName === account.accountName
  ) {
    const expenseDate = moment(expense.expenseDate);

    if (today.date() === expenseDate.date()) {
      newBalance += parseInt(expense.expenseAmount, 10);
    }
  }
});
      return { ...account, accountBalance: newBalance };
    });

    setAccounts(updatedAccounts);

    for (const account of updatedAccounts) {
      try {
        await axios.put(`${baseUrl}/accounts/${account.accountId}`, account, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
      } catch (err) {
        console.error(`Error updating account ${account.accountName}:`, err);
      }
    }
  };

  processRecurringIncomes();
}
}, [incomeData, accounts.length, expenseData]);


const fetchTransactionHistory = (accountName) => {
  const filteredExpenses = expenseData.filter(
    (transaction) => transaction.account.accountName === accountName
  );

  const filteredIncomes = incomeData.filter(
    (transaction) => transaction.account.accountName === accountName
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
 const openAccountModal = (account) => {
   setOpenModal(true);
   document.body.classList.add("active-modal");
   setSelectedAccount(account);
   fetchTransactionHistory(account.accountName);
 };

  const deleteAccount = (accountId) => {
    const authToken = localStorage.getItem("authToken");
    axios
    .delete(`${baseUrl}/accounts/${accountId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      console.log("Account deleted:", res.data);
      setAccounts((prevAccounts) =>
        prevAccounts.filter((acc) => acc.accountId !== accountId)
    );
  })
  .catch((err) => {
    console.error("Error deleting account:", err);
  });
  
  toggleDeleteModal(()=> window.location.reload());
};
const toggleDeleteModal = () => {
  setDeleteModal(!deleteModal);
  if (!deleteModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
};


  return (
    <div className="accountsListingContainer">
      {accountData.length > 0 ? (
        accountData.map((account) => (
          <AccountInfo key={account.accountId}>
            <div className="accountListing">
              <div className="acctHeading">
                <div className="acctName">
                  <GrMoney />
                  <h5 className="acctNameLabel">
                    {account.accountName} - {account.accountNumber}
                  </h5>
                </div>
                <button
                  className="acctHistory"
                  onClick={() => openAccountModal(account)}
                >
                  <MdHistoryToggleOff />
                  <h6 className="historyBtnLabel">History</h6>
                </button>
                {openModal &&
                  selectedAccount?.accountName === account.accountName && (
                    <Modal>
                      <Overlay>
                        <ModalContent>
                          <div className="accountHistoryList">
                            <div className="accountHistoryHeading">
                              <h6 className="accountName">
                                {selectedAccount.accountName} Transaction
                                History:
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
                                  selectedAccount.accountBalance
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
                                  selectedAccount.accountInitialBalance
                                ).toLocaleString()}
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
                                    </span>
                                    <span className="transactionInfo">
                                      {transaction.expenseDescription ||
                                        transaction.incomeDescription}
                                    </span>
                                    <span className="transactionInfo">
                                      {transaction.type === "expense"
                                        ? "-"
                                        : "+"}
                                      {parseInt(
                                        transaction.expenseAmount ||
                                          transaction.incomeAmount
                                      ).toLocaleString()}
                                    </span>
                                  </li>
                                </ol>
                              ))
                            ) : (
                              <p>No transactions found.</p>
                            )}
                          </div>
                        <div className="popup-button">

                          {/* Button */}
                          <button className="close-modal" onClick={openAccountModal}>
                            Close
                          </button>
                          </div>
                        </ModalContent>
                      </Overlay>
                    </Modal>
                  )}
              </div>
              <div className="acctDetailRow">
                <h4 className="acctDetailsHeadings">Account type:</h4>
                <span className="acctDetails">{account.accountType}</span>
              </div>
              <div className="acctDetailRow">
                <h4 className="acctDetailsHeadings">Current Balance:</h4>
                <span className="acctDetails">
                  {parseInt(account.accountBalance).toLocaleString()} Frw
                </span>
              </div>
              <div className="acctDetailRow">
                <h4 className="acctDetailsHeadings">Opening Balance:</h4>
                <span className="acctDetails">
                  {parseInt(account.accountInitialBalance).toLocaleString()} Frw
                </span>
              </div>
              <div className="acctDetailRow">
                <h4 className="acctDetailsHeadings">Account Created On:</h4>
                <span className="acctDetails">
                  {moment(account.createdAt).format("MMMM Do YYYY")}
                </span>
              </div>
              <div className="modify_ItemsAccounts">
                <button
                  className="editItems"
                  onClick={() =>{ toggleModal(account);
                    sendAccount(account);
                  }}
                >
                  <ImPencil2 />
                  <h6 className="historyBtnLabel">EDIT</h6>
                </button>
                <button
                  className="deleteItems"
                  onClick={toggleDeleteModal}
                >
                  <GoTrash />
                  <h6 className="historyBtnLabel">DELETE</h6>
                </button>
                {deleteModal && (
                  <Modal>
                    <Overlay>
                      <ModalContent>
                        <span className="delete-Message">
                          Are You Sure You Want To Delete this Account and all
                          Data associated With This Account?
                        </span>
                        <div className="popup-button">
                          <button
                            className="close-modal"
                            type="submit"
                            onClick={() => deleteAccount(account.accountId)}
                          >
                            Yes
                          </button>
                          <button className="save-data" onClick={toggleDeleteModal}>
                            No
                          </button>
                        </div>
                      </ModalContent>
                    </Overlay>
                  </Modal>
                )}
              </div>
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
