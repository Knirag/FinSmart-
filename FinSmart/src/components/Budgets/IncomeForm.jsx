import {useState} from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";


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

  &:hover {
    cursor: pointer;
    box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5),
      0 0 20px rgba(255, 255, 255, 0.2);
    outline-offset: 15px;
  }
`;

const IncomeForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
    const [incomeFormData, setIncomeFormData] = useState({});

    const onChangeHandler = (e) => {
      const { name, value } = e.target;
      setIncomeFormData({
        ...incomeFormData,
        [name]: value,
      });
    };

     const onSubmit = (e) => {
       e.preventDefault();

       // Retrieve current income data
       const currentIncomeData =
         JSON.parse(localStorage.getItem("incomeData")) || [];

       // Add new income
       const id = uuidv4();
       const newIncome = {
         id: id,
         ...incomeFormData,
       };
       currentIncomeData.push(newIncome);

    const incomeHistory = JSON.parse(localStorage.getItem("incomeHistory")) || [];
        const historyItem = {
          id: id,
          incomeDate: newIncome.date,
          incomeDescription: newIncome.description,
          accountName: newIncome.account,
          amount: newIncome.amount,
        };
        incomeHistory.push(historyItem);
        localStorage.setItem("incomeHistory", JSON.stringify(incomeHistory));

       // Update income data in local storage
       localStorage.setItem("incomeData", JSON.stringify(currentIncomeData));

       // Add income amount to account balance
       const accounts = JSON.parse(localStorage.getItem("accountData")) || [];
       const account = accounts.find((acc) => acc.name === newIncome.account);
       if (account) {
        let newAccountBalance = 0
         newAccountBalance = parseInt(account.balance) + parseInt(newIncome.amount);
        account.balance = newAccountBalance; 
         localStorage.setItem("accountData", JSON.stringify(accounts));
       }

       // Reload page
       window.location.reload();
     };


    // Get account options for dropdown menu
    const accountData = JSON.parse(localStorage.getItem("accountData"));
  return (
    <form action="" className="mb-5" onSubmit={onSubmit}>
      {/* DESCRIPTION */}
      <label
        htmlFor="description"
        className="form-label"
        onSubmit={onChangeHandler}
      >
        Description:
      </label>
      <input
        id="description"
        type="text"
        name="description"
        onChange={onChangeHandler}
      />

      {/* AMOUNT */}
      <label htmlFor="amount" className="form-label">
        Amount:
      </label>
      <input id="amount" type="text" name="amount" onChange={onChangeHandler} />

      {/* Date */}

      <label htmlFor="date" className="form-label1">
        Date:
      </label>
      <div>
        <DatePicker
          className="form-select"
          type="text"
          name="date"
          autocomplete="off"
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            onChangeHandler({ target: { name: "date", value: date } });
          }}
          isClearable
          showYearDropdown
          scrollableMonthYearDropdown
          showTimeSelect
        />
      </div>
<div className="frequencyForm">
        <label className="formFrequency">Is this transaction Reoccuring:</label>
        <div className="frequencyCheckbox">
          <div class="checkbox-wrapper-52">
            <label for="yes-52" className="item">
              <input
                type="checkbox"
                id="yes-52"
                className="hidden"
                name="frequency"
                onChange={onChangeHandler}
              />
              <label for="yes-52" className="cbx">
                <svg width="14px" height="12px" viewBox="0 0 14 12">
                  <polyline points="1 7.6 5 11 13 1"></polyline>
                </svg>
              </label>
              <label for="yes-52" className="cbx-lbl">
                Yes
              </label>
            </label>
          </div>
          </div>
          <div className="checkbox-wrapper-52">
            <label for="no-52" className="item">
              <input
                type="checkbox"
                id="no-52"
                className="hidden"
                name="frequency"
                onChange={onChangeHandler}
              />
              <label for="no-52" className="cbx">
                <svg width="14px" height="12px" viewBox="0 0 14 12">
                  <polyline points="1 7.6 5 11 13 1"></polyline>
                </svg>
              </label>
              <label for="no-52" className="cbx-lbl">
                No
              </label>
            </label>
          </div>
        </div>

      {/* ACCOUNT SELECTION */}
      <label htmlFor="account" className="form-label">
        Account:
      </label>
      <ModalTimelines
        name="account"
        id=""
        className="form-select"
        onChange={onChangeHandler}
      >
        {accountData ? (
          <>
            <option value="">Select account</option>
            {accountData.map((account) => (
              <option key={account.id} value={account.name}>
                {account.name}
              </option>
            ))}
          </>
        ) : (
          <option value="">Loading...</option>
        )}
      </ModalTimelines>

      <br />
      <button className="save-data" type="submit">
        Create
      </button>
    </form>
  );
};

export default IncomeForm;
