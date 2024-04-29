import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import ExpenseList from "./ExpenseList";
import ExpensesFilter from "./ExpensesFilter";
import ExpenseForm from "./ExpenseForm";
import IncomeList from "./IncomeList";
import "../../App.css";
import MonthlyFilter from "../Homepage/MonthlyFilter";
import IncomeForm from "./IncomeForm";
const Budget = styled.div``;


// const Timelines = styled.select`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
//   position: relative;
//   left: 960px;
//   top: 60px;
//   background: rgb(59, 10, 84);
//   border-radius: 4px;
//   border: none;
//   outline: none;
// `;

const BudgetContainer = styled.div`
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
const AddIcon = styled(Link)`
  display: flex;
  font-size: 50px;
  color: #03dbfc;
  border-radius: 30px;
  background-color: rgb(59, 10, 84);
  position: absolute;
  top: 190px;
  right: 40px;
`;
const MinusIcon = styled(Link)`
  display: flex;
  font-size: 50px;
  color: #03dbfc;
  border-radius: 30px;
  background-color: rgb(59, 10, 84);
  position: absolute;
  bottom: 20px;
  right: 40px;
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
  border-radius: 7px;
  min-height: 400px;
  min-width: 290px;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5);
`;

const ModalContent1 = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: rgb(59, 10, 84);
  padding: 14px 28px;
  border-radius: 7px;
  min-height: 400px;
  min-width: 290px;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5);
`;

const Budgets = ({ addExpense, selectedMonth  }) => {
  const [modal, setModal] = useState(false);
 const [modalType, setModalType] = useState(null);
const toggleModal = (type) => {
  setModalType(type);
  setModal(!modal);
  
  if (!modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  // EXPENSE STATE UPDATE(ARRAY:ADD & DELETE)
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: "2kg Potatoes",
      amount: 30000,
      category: "Groceries",
      account: "Mobile Money",
      month: "March",
    },
    {
      id: 2,
      description: "Rent",
      amount: 60000,
      category: "Housing",
      account: "Credit",
      month: "January",
    },
  ]);

  const addItem = (data) => {
    setExpenses(() => [...expenses, data]);
  };
  const deleteItem = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };
  const filterItem = (cat) => {
    setExpenses(expenses.filter((expense) => expense.category == cat));
  };

  // INCOME STATE UPDATE(ARRAY:ADD & DELETE)

  const [income, setIncome] = useState([
    {
      id: 1,
      description: "Salary",
      amount: 300000,
      account: "Mobile Money",
      month: "March",
    },
    {
      id: 2,
      description: "Allowance",
      amount: 500000,
      account: "Mobile Money",
      month: "January",
    },
  ]);
 const addIncome = (data) => {
   setIncome((prevIncome) => [...prevIncome, data]);
 };

 // Function to remove income data by ID
 const deleteIncome = (id) => {
   setIncome(income.filter((item) => item.id !== id));
 };


  return (
    <Budget>
      <h4 className="FinValuesI">Income:</h4>
      <MonthlyFilter filterItem={filterItem} selectedMonth={selectedMonth} />
      <BudgetContainer>
        <IncomeList items={income} deleteItemIncome={deleteIncome} />
      </BudgetContainer>
      <AddIcon>
        <CiCirclePlus onClick={toggleModal} />
      </AddIcon>



      <h4 className="FinValuesE">Expenses:</h4>
      <BudgetContainer>
        <ExpensesFilter filterItem={filterItem} />
        <ExpenseList
          items={expenses}
          deleteItem={deleteItem}
        />
      </BudgetContainer>

      {/* EXPENSES SECTION */}
      <MinusIcon>
        <CiCircleMinus onClick={toggleModal} />
      </MinusIcon>
      {modal && (
        <Modal>
          <Overlay>
            <ModalContent>
              <h5 style={{ color: "#ffff" }}>Create Budget</h5>

              <ExpenseForm
                addExpense={addItem}
              />

              {/* BUTTONS */}
              <button className="close-modal" onClick={toggleModal}>
                Cancel
              </button>
            </ModalContent>
          </Overlay>
        </Modal>
      )}
    </Budget>
  );
};
export default Budgets;