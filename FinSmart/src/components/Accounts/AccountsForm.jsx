import { useState } from "react";
import { useForm } from "react-hook-form";

const AccountsForm = () => {

  const [formInput, setFormInput] = useState({});
  const onchangeHandler = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
      // [balance]:value
    });
  };
  const { handleSubmit } = useForm();

  const onSubmit = (e) => {
    e.preventDefault()
    const currentAccountData = JSON.parse(localStorage.getItem("accountData"));
    currentAccountData.push(formInput);
    localStorage.setItem("accountData", JSON.stringify(currentAccountData));
  };
  return (
    <form action="" className="mb-5" onSubmit={onSubmit}>
      <label htmlFor="name" className="form-label1">
        Name:
      </label>
      <input
        className="acctDetails"
        type="text"
        name="name"
        onChange={onchangeHandler}
      ></input>
      <label htmlFor="name" className="form-label1">
        Balance:
      </label>
      <input
        className="acctDetails"
        type="text"
        name="balance"
        onChange={onchangeHandler}
      ></input>

      <button className="save-data" type="submit" onClick={onSubmit}>
        Add
      </button>
    </form>
  );
};

export default AccountsForm;
