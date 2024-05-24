import { useState, useEffect } from "react";
import "../../App.css";
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
const ExpenseForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
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
    const id = uuidv4();
    const newExpense = {
      id: id,
      ...expenseFormData,
    };
    currentExpenseData.push(newExpense);
    localStorage.setItem("expenseData", JSON.stringify(currentExpenseData));
    const expenseHistory =
      JSON.parse(localStorage.getItem("expenseHistory")) || [];
    const historyItem = {
      id: id,
      expenseDate: newExpense.date,
      expenseDescription: newExpense.description,
      accountName: newExpense.account,
      amount: newExpense.amount,
    };
    expenseHistory.push(historyItem);
    localStorage.setItem("expenseHistory", JSON.stringify(expenseHistory));

    window.location.reload();
  };

  const accountData = JSON.parse(localStorage.getItem("accountData")) || [];
  const categoryData = JSON.parse(localStorage.getItem("categoryData")) || [];
  const subCatData = JSON.parse(localStorage.getItem("subCatData")) || [];

  const [subcategories, setSubcategories] = useState([]);
  const getSubCat = (categoryName) => {
    return subCatData.filter(
      (subcategory) => subcategory.category === categoryName
    );
  };

  useEffect(() => {
    if (expenseFormData.category !== "") {
      const selectedCategory = categoryData.find(
        (cat) => cat.name === expenseFormData.category
      );
      if (selectedCategory) {
        const subcategoriesForCategory = getSubCat(selectedCategory.name);
        setSubcategories(subcategoriesForCategory);
      }
    }
  }, [expenseFormData.category]);
  return (
    <form action="" onSubmit={onSubmit}>
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
        Date
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
      <br></br>
      <div className="frequencyForm">
        <label className="formFrequency">Is this transaction Reoccuring:</label>
        <div className="frequencyCheckbox">
          <div className="checkbox-wrapper-52">
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

        <br></br>
      </div>
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
          <option value="">Add Account</option>
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
        {categoryData ? (
          <>
            <option value="">Select Category</option>
            {categoryData.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </>
        ) : (
          <option value="">Add Category</option>
        )}
      </ModalTimelines>
      {/*  SUB-CATEGORY SELECTION */}
      <label htmlFor="sub-category" className="form-label">
        Sub-Category:
      </label>
      <ModalTimelines
        name="subcategory"
        id=""
        className="form-select"
        onChange={onChangeHandler}
      >
        {subcategories ? (
          <>
            <option value="">Select Sub-Category</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.name}>
                {subcategory.name}
              </option>
            ))}
          </>
        ) : (
          <option value="">Add Subcategory</option>
        )}
      </ModalTimelines>
      <button className="save-data" type="submit">
        Create
      </button>
    </form>
  );
};

export default ExpenseForm;
