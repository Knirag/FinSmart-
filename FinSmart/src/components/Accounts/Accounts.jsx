import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AccountsList from "./AccountsList";
import AccountsForm from "./AccountsForm";
import axios from "axios";
import { baseUrl } from "../../utils";
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
export const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
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
  line-height: 1.4;
  background: rgb(70, 32, 88);
  padding: 14px 28px;
  border-radius: 12px;
  min-height: 200px;
  min-width: 300px;
  box-shadow: inset 0 0 20px rgba(144, 11, 206, 0.5),
    0 0 20px rgba(252, 105, 220, 0.2);
  outline-offset: 15px;
`;

const Accounts = () => {
  const [modal, setModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
      setSelectedAccount(null); // Clear selected account when closing modal
    }
  };

  const fetchAccountsData = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.get(`${baseUrl}/accounts`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setAccounts(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchAccountsData();
  }, []);

  const receiveAccount = (data) => setSelectedAccount(data);

  return (
    <div className="accountsPage">
      <AccountHeader>
        <h3 className="Acc">Accounts</h3>
      </AccountHeader>

      <AccountsList
        accountData={accounts}
        toggleModal={toggleModal}
        sendAccount={receiveAccount}
      />

      <AddIcon>
        <CiCirclePlus onClick={toggleModal} />
      </AddIcon>
      {modal && (
        <Modal>
          <Overlay>
            <ModalContent>
              <h5 style={{ color: "#ffff" }}>
                {selectedAccount ? "Edit Account" : "Add Account"}
              </h5>
              <AccountsForm
                fetchAccounts={fetchAccountsData}
                toggleModal={toggleModal}
                account={selectedAccount}
              />
            </ModalContent>
          </Overlay>
        </Modal>
      )}
    </div>
  );
};

export default Accounts;