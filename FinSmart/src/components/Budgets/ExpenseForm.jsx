import {useState} from "react";
import "../../App.css";
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
const ExpenseForm = () => {
    const [expenseFormData, setExpenseFormData] = useState({});

    const onChangeHandler = (e) => {
      const { name, value } = e.target;
      setExpenseFormData({
        ...expenseFormData,
        [name]: value,
      });
    };

    const onSubmit = (e) => {
      e.preventDefault();
      const currentExpenseData =
        JSON.parse(localStorage.getItem("expenseData")) || [];
      const id = currentExpenseData.length + 1;
      currentExpenseData.push({
        id: id,
        ...expenseFormData,
      });
      localStorage.setItem("expenseData", JSON.stringify(currentExpenseData));
          window.location.reload(); 

    };

const accountData = JSON.parse(localStorage.getItem("accountData"));


  return (
    <form action="" className="mb-5" onSubmit={onSubmit}>
      {/* DESCRIPTION */}
      <label htmlFor="description" className="form-label">
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
      <input
        id="amount"
        type="text"
        name="amount"
        onChange={onChangeHandler}
        required
      />

      {/* MONTH */}
      <label form="" className="form-label">
        Month:
      </label>
      <ModalTimelines
        name="month"
        id=""
        className="form-select"
        onChange={onChangeHandler}
        required
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

      <br></br>
      {/* ACCOUNT SELECTION*/}
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
      <br></br>
      {/* CATEGORY SELECTION */}
      <label htmlFor="category" className="form-label">
        Category:
      </label>
      <ModalTimelines
        name="category"
        id=""
        className="form-select"
        onChange={onChangeHandler}
      >
        <option value="Housing">Housing</option>
        <option value="Utilities">Utilities</option>
        <option value="Transport">Transport</option>
        <option value="Savings">Savings & Investments</option>
        <option value="Groceries">Groceries</option>
        <option value="Education">Education</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Shopping">Shopping</option>
        <option value="Miscelleneous">Miscelleneous</option>
      </ModalTimelines>
      <button className="save-data" type="submit">
        Create
      </button>
    </form>
  );
};

export default ExpenseForm;
