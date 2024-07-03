import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../utils";
import styled from "styled-components";
import { GoPlus } from "react-icons/go";
import { HiMiniMinusSmall } from "react-icons/hi2";
import ExpenseList from "./ExpenseList";
import ExpenseForm from "./ExpenseForm";
import IncomeList from "./IncomeList";
import "../../App.css";
import IncomeForm from "./IncomeForm";
import budgetImage from"../../images/budgetbg.svg"
const Budget = styled.div`
  background-image: url(${budgetImage});
  background-size: contain;
  background-blend-mode: screen;
  background-origin: border-box;
  background-repeat: repeat;
`;

const BudgetHeader = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  left: 100px;
  top: 24px;
`;

const ModalOpen = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  justify-content: flex-end;
  gap: 18px;
  margin-top: 60px;
`;

const AddIcon = styled(Link)`
  display: flex;
  font-size: 24px;
  color: #c6fc03;
  background: none;
  border-radius: 5px;
  border: dotted 1px #1d8a3a;
  padding: 2px 13px;
  width: 80px;
  text-decoration: none;
  margin: 4px;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  font-size: 14px;
  box-shadow: 0px 5px 10px 0px rgba(17, 255, 0, 0.279),
    0 0 20px rgba(255, 255, 255, 0.2), inset 0 0 10px hsl(132.94117647058823, 100%, 50%),
    0 0 40px #083f109d, 0 0 80px #560593ab;
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
  border-radius: 5px;
  border: dotted 1px #b30409;
  width: 90px;
  text-decoration: none;
  padding: 2px 13px;
  margin: 4px;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  box-shadow: 0px 5px 10px 0px rgba(254, 42, 42, 0.224),
    0 0 20px rgba(255, 255, 255, 0.2), inset 0 0 10px hsl(8, 100%, 50%),
    0 0 40px #6000059d, 0 0 80px #3b006fab;
  transition: transform 0.2s;

  &:hover {
    color: #ffffff;
    transition-delay: 0s;
    transform: scale(1.2);
  }
`;

export const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 999;
`;

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(49, 49, 49, 0.8);
  position: fixed;
`;

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.2;
  background: rgb(59, 10, 84);
  padding: 18px 30px;
  border-radius: 7px;
  min-height: 400px;
  min-width: 290px;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5);
`;

const Budgets = () => {
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [incomes, setIncomeData] = useState([]);
  const [expenses, setExpenseData] = useState([]);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const fetchIncomeData = async () => {
    const authToken = localStorage.getItem("authToken");
    const incomes = await axios
      .get(`${baseUrl}/income`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
    setIncomeData(incomes.data);
  };

  const fetchExpenseData = async () => {
    const authToken = localStorage.getItem("authToken");
    const expenses = await axios
      .get(`${baseUrl}/expense`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
    setExpenseData(expenses.data);
  };

  useEffect(() => {
    fetchIncomeData();
    fetchExpenseData();
  }, []);

  const toggleModal = (type, inc= null) => {
    setModalType(type);
    setSelectedIncome(inc);
    setModal(!modal);
    if (!modal) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  };
  
  console.log("blahblah",selectedExpense);
  const modalTitleInc = selectedIncome ? "Update Income" : "Record Income";
  const receivedData = (data) => setSelectedExpense(data);
  const modalTitleExp = selectedExpense ? "Update Expense" : "Record Expense";
  return (
    <Budget>
      <BudgetHeader>
        <h3 className="Acc">Budget</h3>
      </BudgetHeader>

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

      <IncomeList
        incomeData={incomes}
        toggleModal={toggleModal}
        setSelectedIncome={setSelectedIncome}
      />

      {modal && modalType === "income" && (
        <Modal>
          <Overlay>
            <ModalContent>
              {modalTitleInc}
              <IncomeForm
                fetchIncome={fetchIncomeData}
                toggleModal={toggleModal}
                inc={selectedIncome}
              />


            </ModalContent>
          </Overlay>
        </Modal>
      )}

      <ExpenseList
        expenseData={expenses}
        toggleModal={toggleModal}
        sendExpense={receivedData}
      />

      {modal && modalType === "expense" && (
        <Modal>
          <Overlay>
            <ModalContent>
              <h5 style={{ color: "#ffff" }}>{modalTitleExp}</h5>
              <ExpenseForm
                fetchExpenses={fetchExpenseData}
                toggleModal={toggleModal}
                exp={selectedExpense}
              />
             
            </ModalContent>
          </Overlay>
        </Modal>
      )}
    </Budget>
  );
};

export default Budgets;
