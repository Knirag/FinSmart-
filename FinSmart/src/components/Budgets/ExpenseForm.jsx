import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../App.css";
import styled from "styled-components";
import moment from "moment";

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

const ExpenseForm = ({toggleModal, fetchExpenses, exp}) => {
  const [accountList, setAccountList] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [expenseFrequency, setExpenseFrequency] = useState(null);
  const [expenseFormData, setExpenseFormData] = useState({});


  // const updateExpenseFormData = () =>{
  //   if (exp) {
      
  //   } 
  // }
  useEffect(() => {
    if(exp){
    setExpenseFormData({
      processed: exp.processed || 0 ,
      accountId: exp.account.accountId || "",
      expenseDescription: exp.expenseDescription || "",
      expenseAmount: exp.expenseAmount || "",
      expenseFrequency: exp.expenseFrequency || "",
      expenseDate: exp.expenseDate|| "",
      endDate: exp.endDate ||"",
      subcategoryId: exp.category.subcategory.subcategoryId || "",
      categoryId: exp.category.categoryId || "",
    });
    setSelectedEndDate(exp.endDate);
    setExpenseFrequency(exp.expensefrequency);
    setSelectedDate(new Date(exp.expenseDate));
}}, [exp]);
    const onChangeHandler = (e) => {
      const { name, value, type } = e.target;
      const finalValue = type === "radio" ? parseInt(value, 10) : value;
      setExpenseFrequency(value);
      setExpenseFormData({
        processed: 0,
        ...expenseFormData,
        [name]: value,
      });

    };
    const onSubmit = async (e) => {
      e.preventDefault();

      const authToken = localStorage.getItem("authToken");
      const currentMonth = moment().format("YYYY-MM");

      try {
        const [incomeRes, expensesRes] = await Promise.all([
          axios.get(`${baseUrl}/income`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            params: {
              month: currentMonth,
            },
          }),
          axios.get(`${baseUrl}/expense`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            params: {
              month: currentMonth,
            },
          }),
        ]);

        const totalIncome = incomeRes.data.reduce(
          (total, income) => total + parseFloat(income.incomeAmount),
          0
        );
        const totalExpenses = expensesRes.data.reduce(
          (total, expense) => total + parseFloat(expense.expenseAmount),
          0
        );

        if (
          totalExpenses + parseFloat(expenseFormData.expenseAmount) >
          totalIncome
        ) {
          alert("Expenses are too high for this month.");
        }
      if (exp) {
          await axios.put(
            `${baseUrl}/expense/${exp.expenseId}`,
            expenseFormData,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          console.log("Expense updated:", expenseFormData);
        } else {
          const response = await axios.post(
            `${baseUrl}/expense`,
            expenseFormData,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          console.log("Expense added:", response.data);
        }

        fetchExpenses();
        toggleModal("expense");
      } catch (error) {
        console.error("Error processing expense data:", error);
      }
    };

    useEffect(() => {
      const authToken = localStorage.getItem("authToken");

      axios
        .get(`${baseUrl}/accounts`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          setAccountList(res.data);
        })
        .catch((err) => {
          console.error("Error fetching accounts:", err);
        });

      axios
        .get(`${baseUrl}/category`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          setCategoryData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching categories:", err);
        });

  axios
    .get(`${baseUrl}/category/subcategory`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      setSubCategoryData(res.data);
    })
    .catch((err) => {
      console.error("Error fetching categories:", err);
    });

    }, []);

       useEffect(() => {
         if (expenseFormData.categoryId) {
           const selectedCategory = categoryData.find(
             (category) =>
               category.categoryId === parseInt(expenseFormData.categoryId, 10)
           );
           if (selectedCategory) {
             setFilteredSubCategories(selectedCategory.subcategory);
           } else {
             setFilteredSubCategories([]);
           }
         } else {
           setFilteredSubCategories([]);
         }
       }, [expenseFormData.categoryId, categoryData]);
const buttonLabel = exp? "Update" : "Create";
  return (
    <form onSubmit={onSubmit}>
      {/* DESCRIPTION */}
      <label htmlFor="expenseDescription" className="form-label">
        Description:
      </label>
      <input
        id="expenseDescription"
        className="expField"
        type="text"
        name="expenseDescription"
        onChange={onChangeHandler}
        required
        value={expenseFormData.expenseDescription || ""}
      />

      {/* AMOUNT */}
      <label htmlFor="expenseAmount" className="form-label">
        Amount:
      </label>
      <input
        id="expenseAmount"
        type="number"
        name="expenseAmount"
        className="expField"
        onChange={onChangeHandler}
        required
        value={expenseFormData.expenseAmount || ""}
      />

      {/* ACCOUNT SELECTION */}
      <label htmlFor="accountId" className="form-label">
        Account:
      </label>
      <ModalTimelines
        name="accountId"
        className="form-select"
        onChange={onChangeHandler}
        required
        value={expenseFormData.accountId || ""}
      >
        {accountList.length > 0 ? (
          <>
            <option value="">Select account</option>
            {accountList.map((account) => (
              <option key={account.accountId} value={account.accountId}>
                {account.accountName}
              </option>
            ))}
          </>
        ) : (
          <option value="">Loading...</option>
        )}
      </ModalTimelines>
      <br />
      {/* DATE SELECTION */}

      <label htmlFor="name" className="form-label1">
        Date:
      </label>
      <div>
        <DatePicker
          className="acctDetailsForm"
          type="text"
          name="expenseDate"
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            const formattedDate = moment(date).format("YYYY-MM-DD ");
            onChangeHandler({
              target: { name: "expenseDate", value: formattedDate },
            });
          }}
          value={expenseFormData.expenseDate || ""}
          isClearable
          showYearDropdown
          scrollableMonthYearDropdown
          showTimeSelect
        />
      </div>
      <br />
      {/* EXPENSE Frequency */}
      <div className="frequencyForm">
        <label className="formFrequency">Is this transaction Reoccuring:</label>
        <div className="frequencyCheckbox">
          <div className="checkbox-wrapper-52">
            <label for="yes-52" className="item">
              <input
                type="radio"
                id="yes-52"
                className="hidden"
                name="expenseFrequency"
                onChange={onChangeHandler}
                value={expenseFormData.expenseFrequency || 1}
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
              type="radio"
              id="no-52"
              className="hidden"
              name="expenseFrequency"
              onChange={onChangeHandler}
              value={expenseFormData.expenseFrequency || 0}
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
      <br />
      {/* END DATE */}
      {expenseFrequency === "1" && (
        <div>
          <label htmlFor="endDate" className="form-label1">
            Add End date (Optional):
          </label>
          <div>
            <DatePicker
              className="acctDetailsForm"
              type="text"
              name="endDate"
              selected={selectedEndDate}
              onChange={(date) => {
                setSelectedEndDate(date);
                const formattedDate = moment(date).format("YYYY-MM-DD");
                onChangeHandler({
                  target: { name: "endDate", value: formattedDate || null },
                });
              }}
              value={expenseFormData.endDate || null}
              isClearable
            />
          </div>
        </div>
      )}
      <br />
      {/* CATEGORY SELECTION */}
      <label htmlFor="categoryId" className="form-label">
        Category:
      </label>
      <ModalTimelines name="categoryId" onChange={onChangeHandler} required>
        {categoryData.length > 0 ? (
          <>
            <option value="">Select Category</option>
            {categoryData.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </>
        ) : (
          <option value="">Loading...</option>
        )}
      </ModalTimelines>
      <br />

      {/* SUB-CATEGORY SELECTION */}
      <label htmlFor="subCategoryId" className="form-label">
        Sub-Category:
      </label>
      <ModalTimelines
        name="subCategoryId"
        className="form-select"
        onChange={onChangeHandler}
        required
      >
        {filteredSubCategories.length > 0 ? (
          <>
            <option value="">Select Sub-Category</option>
            {filteredSubCategories.map((subcat) => (
              <option key={subcat.subCategoryId} value={subcat.subCategoryId}>
                {subcat.subCategoryName}
              </option>
            ))}
          </>
        ) : (
          <option value="">Select a category first</option>
        )}
      </ModalTimelines>
      <div className="popup-button">
      <button className="save-data" type="submit">
        Create
      </button>
      <button className="close-modal" onClick={() => toggleModal("expense")}>
        Cancel
      </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
