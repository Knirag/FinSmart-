import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CiCirclePlus } from "react-icons/ci";
import { PiDotsThreeVerticalFill } from "react-icons/pi";

import "../../App.css";

const Budget = styled.body``;

const Timelines = styled.select`
  background: rgb(59, 10, 84);
  height: 20px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #e1e9fc;
  font-size: 10px;
  justify-content: flex-end;
  position: relative;
  left: 960px;
  top: 60px;
  border-radius: 1.5px;
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.5);

  &:hover {
    cursor: pointer;
  }
`;
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
const ExpenseCategory = styled.select`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  left: 370px;
  bottom: 200px;
  background: rgb(59, 10, 84);
  border-radius: 4px;
  border: none;
  outline: none;
`;
const BudgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 90px;
  width: 900px;
  height: 200px;
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
  position: fixed;
  bottom: 50px;
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
const ModalTimelines = styled.select`
  background: rgb(59, 10, 84);
  height: 28px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #e1e9fc;
  font-size: 13px;
  text-align: center;
  width: 335px;
  margin: 0 auto;
  padding: 3px;
  border: 1px solid #732982;
  border-radius: 4px;

  // justify-content: flex-end;
  // position: relative;
  // left: 960px;
  // top: 60px;

  &:hover {
    // border-left: 4px solid #08fbff;
    cursor: pointer;
    // border: 1px solid;
    box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5),
      0 0 20px rgba(255, 255, 255, 0.2);
    // outline-color: rgba(255, 255, 255, 0);
    outline-offset: 15px;
    // text-shadow: 1px 1px 2px #ffffff;
  }
`;
const Budgets = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);

    if (modal) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  };
  // const [text, setText] = useState('');
  //const [amount, setAmount] = useState(0);
  return (
    <Budget>
      <Timelines>
        <option value="january">January</option>
        <option value="february">February</option>
        <option value="march">March</option>
        <option value="april">April</option>
        <option value="may">May</option>
        <option value="june">June</option>
        <option value="july">July</option>
        <option value="august">August</option>
        <option value="september">September</option>
        <option value="october">October</option>
        <option value="november">November</option>
        <option value="december">December</option>
      </Timelines>
      <BudgetContainer>
        <h4 className="FinValues">Income:</h4>
        <h6>Name</h6> <h6>Amount</h6> <PiDotsThreeVerticalFill />
      </BudgetContainer>
      <BudgetContainer>
        <h4 className="FinValues">Expenses:</h4>
        <ExpenseCategory>
          <option value="Option1">Housing</option>
          <option value="Option2">Utilities</option>
          <option value="Option3">Transport</option>
          <option value="Option4">Savings & Investments</option>
          <option value="Option5">Groceries</option>
          <option value="Option6">Education</option>
          <option value="Option7">Entertainment</option>
          <option value="Option8">Shopping</option>
          <option value="Option9">Miscelleneous</option>
        </ExpenseCategory>
        <h5 id="category">Category</h5>
        <h6>Name</h6>
        <h6>Amount </h6> <PiDotsThreeVerticalFill />
      </BudgetContainer>
      <AddIcon>
        <CiCirclePlus onClick={toggleModal} />
      </AddIcon>
      {modal && (
        <Modal>
          <Overlay>
            <ModalContent>
              <h5 style={{ color: "#ffff" }}>Create Budget</h5>
              <form>
                <label>Name:</label>
                <input type="text" value></input>
                <label>Amount:</label>
                <input></input>
                <label>Month:</label>
                <ModalTimelines>
                  <option value="january">January</option>
                  <option value="february">February</option>
                  <option value="march">March</option>
                  <option value="april">April</option>
                  <option value="may">May</option>
                  <option value="june">June</option>
                  <option value="july">July</option>
                  <option value="august">August</option>
                  <option value="september">September</option>
                  <option value="october">October</option>
                  <option value="november">November</option>
                  <option value="december">December</option>
                </ModalTimelines>
                <br></br>
                <label>Account:</label>
                <ModalTimelines>
                  <option value="someOption">Mobile Money</option>
                  <option value="otherOption">Credit Account</option>
                </ModalTimelines>
                <br></br>
                <label>Category:</label>
                <ModalTimelines>
                  <option value="Option1">Housing</option>
                  <option value="Option2">Utilities</option>
                  <option value="Option3">Transport</option>
                  <option value="Option4">Savings & Investments</option>
                  <option value="Option5">Groceries</option>
                  <option value="Option6">Education</option>
                  <option value="Option7">Entertainment</option>
                  <option value="Option8">Shopping</option>
                  <option value="Option9">Miscelleneous</option>
                </ModalTimelines>
                <button className="save-data">Create</button>
                <button className="close-modal" onClick={toggleModal}>
                  Cancel
                </button>
              </form>
            </ModalContent>
          </Overlay>
        </Modal>
      )}
    </Budget>
  );
};
export default Budgets;
