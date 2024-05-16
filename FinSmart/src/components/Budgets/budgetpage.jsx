import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GoPlus } from "react-icons/go";
import { HiMiniMinusSmall } from "react-icons/hi2";
import ExpenseList from "./ExpenseList";
import ExpenseForm from "./ExpenseForm";
import IncomeList from "./IncomeList";
import "../../App.css";
import MonthlyFilter from "../Homepage/MonthlyFilter";
import IncomeForm from "./IncomeForm";
import ExpensesFilter from "./ExpensesFilter";
const Budget = styled.div``;

const BudgetHeader = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  left: 100px;
  top: 24px;
`;
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
const ModalOpen = styled.div`
display:flex;
flex-direction: row;
margin: 0 auto;
justify-content: flex-end;
gap: 18px;
`;

const AddIcon = styled(Link)`
  display: flex;
  font-size: 24px;
  color: #03dbfc;
  background: none;
  border-radius: 1px;
  border: dotted 1px #1d8a3a;
  width: 80px;
  text-decoration: none;
  margin: 4px;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  font-size: 14px;
  box-shadow: 0px 5px 10px 0px rgba(23, 254, 23, 0.587),
    0 0 20px rgba(81, 253, 104, 0.443);
  transition: transform 0.2s;

  &:hover {
    color: #ffffff;
    transition-delay: 0s;
    transform: scale(1.2);
  }
`;
const MinusIcon = styled(Link)`
  display: flex;
  font-size: 24px;
  color: #03dbfc;
  background-color: none;
  border-radius: 1px;
  border: dotted 1px #b30409;
  width: 90px;
  text-decoration: none;
  margin: 4px;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  box-shadow: 0px 5px 10px 0px rgba(244, 32, 32, 0.5),
    0 0 20px rgba(255, 0, 0, 0.2);
  transition: transform 0.2s;

  &:hover {
    color: #ffffff;
    transition-delay: 0s;
    transform: scale(1.2);
  }
`;

const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 999;
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

const Budgets = () => {
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
  };

  const [expenses, setExpenses] = useState([
    {
      id: "",
      description: "",
      amount: "",
      category: "",
      account: "",
      month: "",
    },
  ]);
  const [income, setIncome] = useState([
    {
      id: "",
      description: "",
      amount: "",
      account: "",
      month: "",
    },
  ]);
  useEffect(() => {
    // Retrieve expenses data from local storage
    const storedExpenses = JSON.parse(localStorage.getItem("expenseData")) || [];
    setExpenses(storedExpenses);
  }, []);


  const [expenseData, setExpenseData] = useState([]);
    const storedTotalIncome = localStorage.getItem("totalIncome");
    const storedTotalExpenses = localStorage.getItem("totalExpenses");
  const handleAddExpense = (newData) => {
    setExpenseData([...expenseData, newData]);
     const updatedAccounts = expenses.map((item) => {
    if (item.account === newData.account) {
      // Deduct the expense amount from the balance
      return { ...item, balance: parseFloat(item.balance) - parseFloat(newData.amount) };
    }
    return item;
     });
     setExpenses(updatedAccounts);
    };
  const [incomeData, setIncomeData] = useState([]);

  const handleAddIncome = (newData) => {
    setIncomeData([...incomeData, newData]);
    const updatedAccounts = income.map((item) => {
      if (item.account === newData.account) {
        // Add the income amount to the balance
        return {
          ...item,
          balance: parseFloat(item.balance) + parseFloat(newData.amount),
        };
      }
      return item;
    });

    // Update the income state with the updated account balances
    setIncome(updatedAccounts);
  };

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  return (
    <Budget>
      <BudgetHeader>
        <h3 className="Acc">Budget</h3>
      </BudgetHeader>
      <div className="totalsIE">
        <div className="totalIERow">
          <h3 className="totalHeading">Total Income:</h3>
          <h4 className="totalValue">
            {parseInt(storedTotalIncome).toLocaleString()}Frw
          </h4>
        </div>
        <div className="totalIERow">
          <h3 className="totalHeading">Total Expenses:</h3>
          <h4 className="totalValue">
            {parseInt(storedTotalExpenses).toLocaleString()}Frw
          </h4>
        </div>
      </div>
      {/* INCOME */}
      {/* <h4 className="FinValuesI">Income:</h4> */}
      {/* <MonthlyFilter /> */}
      {/* Modal Button */}
      <ModalOpen>
        <AddIcon onClick={() => toggleModal("income")}>
          <GoPlus />
          <h5 className="incomeExpenseLabel">Earn</h5>
        </AddIcon>
        <MinusIcon onClick={() => toggleModal("expense")}>
          <HiMiniMinusSmall />
          <h5 className="incomeExpenseLabel">Spend</h5>
        </MinusIcon>
      </ModalOpen>
      {/* Rendering Income List */}
      <IncomeList incomeData={incomeData} items={income} />
      {/* INCOME Modal */}

      {modal && modalType === "income" && (
        <Modal>
          <Overlay>
            <ModalContent>
              <h5 style={{ color: "#ffff" }}>Record Income</h5>
              <IncomeForm addIncome={handleAddIncome} />
              <button
                className="close-modal"
                onClick={() => toggleModal("income")}
              >
                Cancel
              </button>
            </ModalContent>
          </Overlay>
        </Modal>
      )}

      {/* EXPENSES */}
      {/* <ExpensesFilter onChange={handleCategoryChange} /> */}
     
        <ExpenseList
          expenses={expenses}
          items={expenses}
          selectedCategory={selectedCategory}
        />

      {/* EXPENSES Modal */}

      {modal && modalType === "expense" && (
        <Modal>
          <Overlay>
            <ModalContent>
              <h5 style={{ color: "#ffff" }}>Recorde Expense:</h5>

              <ExpenseForm
                addExpense={handleAddExpense}
                onSubmit={toggleModal}
              />

              {/* BUTTONS */}
              <button
                className="close-modal"
                onClick={() => toggleModal("expense")}
              >
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
