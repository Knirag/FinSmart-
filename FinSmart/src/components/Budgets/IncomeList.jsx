import React from "react";
import { GoTrash } from "react-icons/go";
import { BsPlusCircleDotted } from "react-icons/bs";
import moment from "moment";
import styled from "styled-components";

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
  box-shadow: 0px 5px 10px 0px rgba(0, 255, 17, 0.5),
    0 0 20px rgba(49, 255, 97, 0.2);
`;
const IncomeList = () => {
  const listIncomeData = JSON.parse(localStorage.getItem("incomeData"));

  const handleDeleteIncome = (incomeId) => {
    const incomes = JSON.parse(localStorage.getItem("incomeData")) || [];
    const deletedIncome = incomes.find((income) => income.id === incomeId);
    const updatedIncomes = incomes.filter((income) => income.id !== incomeId);
    localStorage.setItem("incomeData", JSON.stringify(updatedIncomes));
    if (deletedIncome) {
      const accounts = JSON.parse(localStorage.getItem("accountData")) || [];
      const account = accounts.find(
        (acc) => acc.name === deletedIncome.account
      );
      if (account) {
        let newAccountBalance =
          parseInt(account.balance) - parseInt(deletedIncome.amount);
        account.balance = newAccountBalance;
        localStorage.setItem("accountData", JSON.stringify(accounts));
      }
    }
    window.location.reload();
  };

  const totalIncome = listIncomeData
    ? listIncomeData
        .reduce((total, income) => total + parseInt(income.amount), 0)
        .toFixed(2)
    : "0.00";
  localStorage.setItem("totalIncome", totalIncome);
  return (
    <div className="incomeListingContainer">
      {listIncomeData ? (
        listIncomeData.map((income) => (
          <BudgetContainer key={income.id}>
            <div className="incomeList">
              <div className="incomeHeading">
                <h4 className="incomeTiltle">
                  <BsPlusCircleDotted />
                  <h5 className="incomeLabelName">{income.description}</h5>
                </h4>
              </div>
              <div className="incomeRow">
                <h5 className="incomeDetailHeadings">Amount:</h5>
                <span className="incomeDetails">
                  {parseInt(income.amount).toLocaleString()}Frw
                </span>
              </div>
              <div className="incomeRow">
                <h5 className="incomeDetailHeadings">Account:</h5>
                <span className="incomeDetails">{income.account}</span>
              </div>
              <div className="incomeRow">
                <h5 className="incomeDetailHeadings">Date:</h5>
                <span className="incomeDetails">
                  {moment(income.date).format("MMMM Do YYYY")}
                </span>
              </div>

              <button
                className="deleteItems"
                onClick={() => handleDeleteIncome(income.id)}
              >
                <GoTrash />
                <h6 className="historyBtnLabel">Delete</h6>
              </button>
            </div>
          </BudgetContainer>
        ))
      ) : (
        <BudgetContainer>
          <h4 className="infoMessage">Add Budget Data</h4>
        </BudgetContainer>
      )}
    </div>
  );
};

export default IncomeList;
