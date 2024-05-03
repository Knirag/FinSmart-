import {useState} from "react";
import styled from "styled-components";

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
       const id = currentIncomeData.length + 1;
       const newIncome = {
         id: id,
         ...incomeFormData,
       };
       currentIncomeData.push(newIncome);

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

      {/* MONTH */}
      <label htmlFor="month" className="form-label">
        Month:
      </label>

      <ModalTimelines
        name="month"
        id=""
        className="form-select"
        onChange={onChangeHandler}
      >
        <option value="">Select Month</option>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>h
        <option value="December">December</option>
      </ModalTimelines>

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
