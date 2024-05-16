import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AccountsList from "./AccountsList";
import AccountsForm from "./AccountsForm";
import { CiCirclePlus } from "react-icons/ci";
import "../../App.css";

const AccountHeader = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  left: 100px;
  top: 24px;
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
  border-radius: 3px;
  min-height: 200px;
  min-width: 300px;
`;

const Accounts = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);

    if (modal) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  };

  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "Mobile Money",
      balance: 20000,
    },
  ]);

  const [accountData, setAccountData] = useState([]);

  const handleAddAccount = (newData) => {
    setAccountData(newData);
  };

  return (
    <div className="accountsPage">
      <AccountHeader>
        <h3 className="Acc">Accounts</h3>
      </AccountHeader>

      <AccountsList items={accounts} accountData={accountData} />

      <AddIcon>
        <CiCirclePlus onClick={toggleModal} />
      </AddIcon>
      {modal && (
        <Modal>
          <Overlay>
            <ModalContent>
              <h5 style={{ color: "#ffff" }}>Add Acccount:</h5>
              <AccountsForm
                addAccount={handleAddAccount}
                onSubmit={toggleModal}
              />
              {/* Button */}
              <button className="close-modal" onClick={toggleModal}>
                Cancel
              </button>
            </ModalContent>
          </Overlay>
        </Modal>
      )}
    </div>
  );
};

export default Accounts;
