import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import ExpenseList from "./ExpenseList";
import ExpenseForm from "./ExpenseForm";
import IncomeList from "./IncomeList";
import "../../App.css";
import MonthlyFilter from "../Homepage/MonthlyFilter";
import IncomeForm from "./IncomeForm";
const Budget = styled.div``;

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
  const [selectedMonth, setSelectedMonth] = useState("");

  const toggleModal = (type) => {
    setModalType(type);
    setModal(!modal);

    if (!modal) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  };

  useEffect(() => {
    const storedMonth = localStorage.getItem("selectedMonth");
    if (storedMonth) {
      setSelectedMonth(storedMonth);
    }
  }, []);

  const filterDataByMonth = (data) => {
    return data.filter((item) => item.month === selectedMonth);
  };
  const [expenses, setExpenses] = useState([
    {
      id: 1,
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

  const [expenseData, setExpenseData] = useState([]);

  const handleAddExpense = (newData) => {
    setExpenseData(newData);
  };
  const [incomeData, setIncomeData] = useState([]);

  const handleAddIncome = (newData) => {
    setIncomeData(newData);
  };
  return (
    <Budget>
      {/* INCOME */}
      <h4 className="FinValuesI">Income:</h4>
      <MonthlyFilter filterItem={setSelectedMonth} />
      <BudgetContainer>
        <IncomeList incomeData={filterDataByMonth(incomeData)} items={income} />
      </BudgetContainer>
      <AddIcon>
        <CiCirclePlus onClick={() => toggleModal("income")} />
      </AddIcon>

      {/* EXPENSES Modal */}

      {modal && modalType === "income" && (
        <Modal>
          <Overlay>
            <ModalContent>
              <h5 style={{ color: "#ffff" }}>Add Income:</h5>
              <IncomeForm addIncome={handleAddIncome} onSubmit={toggleModal} />
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
      <h4 className="FinValuesE">Expenses:</h4>
      <BudgetContainer>
        <ExpenseList
          expenseData={filterDataByMonth(expenseData)}
          items={expenses}
        />
      </BudgetContainer>

      {/* EXPENSES Modal */}
      <MinusIcon>
        <CiCircleMinus onClick={() => toggleModal("expense")} />
      </MinusIcon>
      {modal && modalType === "expense" && (
        <Modal>
          <Overlay>
            <ModalContent>
              <h5 style={{ color: "#ffff" }}>Create Budget</h5>

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
