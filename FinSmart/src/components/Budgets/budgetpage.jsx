import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CiCirclePlus } from "react-icons/ci";

// const Body = styled.body`
//   &.active-modal {
//     overflow-y: hidden;
//   }
// `;

const AddIcon = styled(Link)`
  display: flex;
  font-size: 50px;
  color: #03dbfc;
  border-radius: 30px;
  background-color: #b661f2;
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
  border-radius: 3px;
  min-height: 400px;
  min-width: 300px;
`;
// const BudgetContainer = styled.div`
//   width: 100px;
//   // background: rgb(59, 10, 84);
//   color: "#05f7d3";
// `;
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
  return (
    <div className="budget">
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
                <input></input>
                <label>Amount:</label>
                <input></input>
                <label>Month:</label>
                <select>
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
                </select>
                <br></br>
                <label>Account:</label>
                <select>
                  <option value="someOption">Mobile Money</option>
                  <option value="otherOption">Credit Account</option>
                </select>
                <br></br>
                <label>Category:</label>
                <select>
                  <option value="Option1">Housing</option>
                  <option value="Option2">Utilities</option>
                  <option value="Option3">Transport</option>
                  <option value="Option4">Savings & Investments</option>
                  <option value="Option5">Groceries</option>
                  <option value="Option6">Education</option>
                  <option value="Option7">Entertainment</option>
                  <option value="Option8">Shopping</option>
                  <option value="Option9">Miscelleneous</option>
                </select>
                <button>Create</button>
                <button className="close-modal" onClick={toggleModal}>
                  Cancel
                </button>
              </form>
            </ModalContent>
          </Overlay>
        </Modal>
      )}
    </div>
  );
};

export default Budgets;
