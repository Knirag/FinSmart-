import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../utils";
import { GoTrash } from "react-icons/go";
import { BsDashCircleDotted } from "react-icons/bs";
import { ImPencil2 } from "react-icons/im";
import styled from "styled-components";
import moment from "moment";

const BudgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 43px;
  width: 900px;
  height: 100%;
  background: rgb(59, 10, 84);
  color: "#05f7d3";
  border-radius: 9px;
  box-shadow: 0px 5px 10px 0px rgba(255, 13, 13, 0.838),
    0 0 20px rgba(255, 208, 54, 0.2);
`;
const ExpenseList = ({expenseData, toggleModal,sendExpense }) => {
  const [expensesList, setExpensesList] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [checkedState, setCheckedState] = useState({});
useEffect(() => {
  setExpensesList(expenseData);
}, [expenseData]);
 
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const fetchAccounts = async () => {
      try {
        const accountsRes = await axios.get(`${baseUrl}/accounts`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setAccounts(accountsRes.data);
      } catch (err) {
        console.log("Error fetching accounts:", err);
      }
    };

    fetchAccounts();
  }, []);
 useEffect(() => {
   const initialCheckedState = {};
   const updatedExpenses = expenseData.map((expense) => {
     const expenseDate = moment(expense.expenseDate);
     if (
       expenseDate.isSameOrBefore(moment(), "day") &&
       expense.processed !== 1
     ) {
       updateAccountBalance(
         expense.account.accountName,
         expense.expenseAmount,
         expense.expenseId
       );
       initialCheckedState[expense.expenseId] = true;
       return { ...expense, processed: 1 };
     } else {
       initialCheckedState[expense.expenseId] = expense.processed === 1;
       return expense;
     }
   });

   setCheckedState(initialCheckedState);
   setExpensesList(updatedExpenses);
 }, [expenseData]);

 const updateAccountBalance = async (accountName, expenseAmount, expenseId) => {
   const account = accounts.find((acc) => acc.accountName === accountName);
   if (account) {
     const newAccountBalance =
       parseInt(account.accountBalance) - parseInt(expenseAmount);
     const updatedAccount = { ...account, accountBalance: newAccountBalance };

     try {
       await axios.put(
         `${baseUrl}/expense/${expenseId}`,
         { processed: 1 },
         {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
           },
         }
       );

       await axios.put(
         `${baseUrl}/accounts/${account.accountId}`,
         updatedAccount,
         {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
           },
         }
       );

       setAccounts((prevAccounts) =>
         prevAccounts.map((acc) =>
           acc.accountId === account.accountId ? updatedAccount : acc
         )
       );

       setExpensesList((prevExpensesList) =>
         prevExpensesList.map((expense) =>
           expense.expenseId === expenseId
             ? { ...expense, processed: 1 }
             : expense
         )
       );
     } catch (err) {
       console.error(
         "Error updating account balance or processing expense:",
         err
       );
     }
   }
 };

 const handleCheckboxChange = (
   expenseId,
   accountName,
   expenseAmount,
   event
 ) => {
   const checked = event.target.checked;
   setCheckedState((prevState) => ({
     ...prevState,
     [expenseId]: checked,
   }));
   if (checked) {
     updateAccountBalance(accountName, expenseAmount, expenseId);
   }
 };


  const deleteExpense = (expenseId) => {
    const authToken = localStorage.getItem("authToken");
    axios
      .delete(`${baseUrl}/expense/${expenseId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        console.log("Expense deleted:", res.data);
        setExpensesList((prevExp) =>
          prevExp.filter((exp) => exp.expenseId !== expenseId)
        );
      })
      .catch((err) => {
        console.error("Error deleting expense:", err);
      });
  };

  return (
    <div className="expenseTable">
      {expensesList.length > 0 ? (
        expensesList.map((exp) => (
          <BudgetContainer key={exp.expenseId}>
            <div className="expenseHeading">
              <div className="expenseTitle">
                <i className="income-Icon">
                  <BsDashCircleDotted />
                </i>
                <h5 className="expenseNameLabel">{exp.expenseDescription}</h5>
              </div>
              <div className="expenseAmountCol">
                {parseInt(exp.expenseAmount).toLocaleString()} Frw
              </div>
            </div>
            <div className="expenseDetailsCol">
              <div className="expenseRow">
                <h5 className="expenseLabel">Category:</h5>
                <span className="expenseValue">
                  {exp.category.categoryName}
                </span>
              </div>
              <div className="expenseRow">
                <h5 className="expenseLabel">Sub-Category:</h5>
                <span>{exp.subCategory.subCategoryName}</span>
              </div>
              <div className="expenseRow">
                <h5 className="expenseLabel">Account:</h5>
                <span className="expenseValue">{exp.account.accountName}</span>
              </div>
              <div className="expenseRow">
                <h5 className="expenseLabel">Date:</h5>
                <span className="expenseValue">
                  {moment(exp.expenseDate).format("MMMM Do YYYY")}
                </span>
              </div>
              <div className="expenseRow">
                <h5 className="expenseLabelFreq">
                  {exp.expenseFrequency ? "Recurring" : ""}
                  {exp.endDate
                    ? ` till ${moment(exp.endDate).format("MMMM Do YYYY")}`
                    : ""}
                </h5>
              </div>
            </div>
            <div className="incomeActions">
              <div className="incomeBalanceTransaction">
                <div className="checkbox-wrapper-39">
                  <label>
                    <input
                      type="checkbox"
                      checked={checkedState[exp.expenseId] || false}
                      onChange={(e) =>
                        handleCheckboxChange(
                          exp.expenseId,
                          exp.account.accountName,
                          exp.expenseAmount,
                          e
                        )
                      }
                    />
                    <span className="checkbox"></span>
                  </label>
                </div>
              </div>
              <div className="modify_Items">
                <button
                  className="editItems"
                  onClick={() => {
                    toggleModal("expense", exp);
                    sendExpense(exp);
                  }}
                >
                  <ImPencil2 />
                  <h6 className="historyBtnLabel">EDIT</h6>
                </button>
                <button
                  className="deleteItems"
                  onClick={() => deleteExpense(exp.expenseId)}
                >
                  <GoTrash />
                  <h6 className="historyBtnLabel">Delete</h6>
                </button>
              </div>
            </div>
          </BudgetContainer>
        ))
      ) : (
        <BudgetContainer>
          <h5>Add Budget Data</h5>
        </BudgetContainer>
      )}
    </div>
  );
};

export default ExpenseList;
