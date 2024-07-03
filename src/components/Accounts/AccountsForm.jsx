import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../utils";


const AccountsForm = ({ fetchAccounts, toggleModal, account }) => {
  const [accountInitialBalance, setInitialBalance] = useState(0);
  const [formInput, setFormInput] = useState({});

  useEffect(() => {
    if (account) {
      setFormInput({
        accountId: account.accountId || "",
        accountName: account.accountName || "",
        accountBalance: account.accountInitialBalance || "",
        accountType: account.accountType || "",
        accountNumber: account.accountNumber || "",
      });
    setInitialBalance(account.accountInitialBalance || 0);
    }
  }, [account]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormInput((prevFormInput) => ({
      ...prevFormInput,
      accountInitialBalance: accountInitialBalance,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formInput,
      accountInitialBalance: formInput.accountBalance,
    };

    const authToken = localStorage.getItem("authToken");

    try {
      if (account) {
        
        await axios.put(
          `${baseUrl}/accounts/${account.accountId}`,
          dataToSend,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log("Account updated:", dataToSend);
      } else {
        // Create new account
        await axios.post(`${baseUrl}/accounts`, dataToSend, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log("Account added:", dataToSend);
      }
      fetchAccounts();
      toggleModal();
    } catch (error) {
      console.error("Error adding/updating account:", error);
    }
  };

 const buttonLabel = account ? "Update" : "Create";
 
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="accountName" className="form-label1">
        Name:
      </label>
      <input
        className="acctDetailsForm"
        type="text"
        name="accountName"
        onChange={onChangeHandler}
        required
        value={formInput.accountName || ""}
      />

      <label htmlFor="accountNumber" className="form-label1">
        Account Number:
      </label>
      <input
        className="acctDetailsForm"
        type="text"
        name="accountNumber"
        onChange={onChangeHandler}
        required
        value={formInput.accountNumber || ""}
      />

      <label htmlFor="accountType" className="form-label1">
        Account Type:
      </label>
      <input
        className="acctDetailsForm"
        type="text"
        name="accountType"
        onChange={onChangeHandler}
        value={formInput.accountType || ""}
      />

      <label htmlFor="accountBalance" className="form-label1">
        Balance:
      </label>
      <input
        className="acctDetailsForm"
        type="text"
        name="accountBalance"
        value={formInput.accountBalance || ""}
        onChange={(e) => {
          const newBalance = e.target.value;
          setFormInput((prevFormInput) => ({
            ...prevFormInput,
            accountBalance: newBalance,
          }));
        }}
        required
      />
      <div className="popup-button">
        <button className="save-data" type="submit">
          {buttonLabel}
        </button>
        <button className="close-modal" onClick={toggleModal}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AccountsForm;
