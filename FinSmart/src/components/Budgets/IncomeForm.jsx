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


// const onSubmit = (data) => {
//   // Handle form submission logic here
// onSubmit={handleSubmit(addIncome)}
// };

const IncomeForm = () => {
    const [formData,setFormData] = useState({})
    const onChangeHandler = (e) =>{
        const { value } = e.target;
        const {name} = e.target
        setFormData({
            ...formData,
            [name]:value
        })
    }
  return (
    <form action="" className="mb-5">
        
      {/* DESCRIPTION */}
      <label htmlFor="description" className="form-label" onSubmit={onChangeHandler}>
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
      />

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
        <option value="January">January</option>
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
        <option value="MobileMoney">Mobile Money</option>
        <option value="CreditAcc">Credit Account</option>
      </ModalTimelines>

      <br />
      <button className="save-data" type="submit">
        Create
      </button>
    </form>
  );
};

export default IncomeForm;
