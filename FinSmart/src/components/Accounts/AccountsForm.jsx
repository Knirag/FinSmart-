import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AccountsForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [initialBalance, setInitialBalance] = useState(0);
  const [formInput, setFormInput] = useState({});
  const onChangeHandler = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
    // setSelectedDate(date);
  };
 
  const onSubmit = (e) => {
    e.preventDefault();
    const currentAccountData =
      JSON.parse(localStorage.getItem("accountData")) || [];
    const id = currentAccountData.length + 1;
    currentAccountData.push({
      id: id,
      ...formInput,
      initialBalance: formInput.balance,
    });
    console.log("Form data:", currentAccountData)
    localStorage.setItem("accountData", JSON.stringify(currentAccountData));
    window.location.reload();
  };
  return (
    <form action="" onSubmit={onSubmit}>
      <label htmlFor="name" className="form-label1">
        Name:
      </label>
      <input
        className="acctDetailsForm"
        type="text"
        name="name"
        onChange={onChangeHandler}
        required
      />
      <label htmlFor="name" className="form-label1">
        Account Type:
      </label>
      <input
        className="acctDetailsForm"
        type="text"
        name="accttype"
        onChange={onChangeHandler}
      />
      <label htmlFor="name" className="form-label1">
        Balance:
      </label>
      <input
        className="acctDetailsForm"
        type="text"
        name="balance"
        value={initialBalance}
        onChange={(e) => {
          const newBalance = e.target.value;
          setInitialBalance(newBalance); 
          onChangeHandler({
            target: { name: "balance", value: newBalance },
          });
          console.log("DamitaJo", newBalance);
        }}
        required
        placeholder="AcctBalance"
      />
      <label htmlFor="name" className="form-label1">
        Date:
      </label>
      <div>
        <DatePicker
          className="acctDetailsForm"
          type="text"
          name="date"
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
      <button className="save-data" type="submit" onClick={onSubmit}>
        Add
      </button>
    </form>
  );
};

export default AccountsForm;
