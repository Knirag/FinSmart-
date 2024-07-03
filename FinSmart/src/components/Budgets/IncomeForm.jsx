import { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import axios from "axios";
import "../../App.css";
import { baseUrl } from "../../utils";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

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

const IncomeForm = ({fetchIncome, toggleModal, inc}) => {
  const [incomeFormData, setIncomeFormData] = useState({});
  const [accountList, setAccountList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [incomeFrequency, setIncomeFrequency] = useState(null);

useEffect(() => { if (inc) {
  setIncomeFormData({
    processed: inc.processed || 0,
    accountId: inc.account.accountId || "",
    incomeDescription: inc.incomeDescription ||"",
    incomeAmount: inc.incomeAmount ||"",
    incomeFrequency: inc.incomeFrequency ||"",
    incomeDate: moment(inc.incomeDate).format("YYYY-MM-DD") ||"",
    endDate: moment(inc.endDate).format("YYYY-MM-DD") || "",
  });
  // console.log("Date something", inc.endDate);
}
},[])
  const onChangeHandler = (e) => {
    const { name, value, type } = e.target;
    const finalValue = type === "radio" ? parseInt(value, 10) : value;
    setIncomeFrequency(value);
    setIncomeFormData({
      processed: 0,
      ...incomeFormData,
      [name]: value,
    });
  };

  const onSubmit = async(e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");
    try {
      if (inc) {
        const dataToSend = {...incomeFormData,endDate: selectedEndDate || inc.endDate };
        
        await axios.put(`${baseUrl}/income/${inc.incomeId}`, dataToSend, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
            console.log("Income updated:", incomeFormData);
      } else {
        await axios.post(`${baseUrl}/income`, incomeFormData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      }
    } catch (error) {
      console.error("Error income data:", error);
    }
    fetchIncome();
    toggleModal("income");
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
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error fetching accounts:", err);
      });
  }, []);
const buttonLabel = inc? "Update" : "Create";
  return (
    <form action="" className="mb-5" onSubmit={onSubmit}>
      {/* DESCRIPTION */}
      <label htmlFor="description" className="form-label">
        Description:
      </label>
      <input
        id="description"
        className="expField"
        type="text"
        name="incomeDescription"
        onChange={onChangeHandler}
        value={incomeFormData.incomeDescription}
      />

      {/* AMOUNT */}
      <label htmlFor="amount" className="form-label">
        Amount:
      </label>
      <input
        id="amount"
        type="text"
        className="expField"
        name="incomeAmount"
        onChange={onChangeHandler}
        value={incomeFormData.incomeAmount}
      />

      {/* ACCOUNT SELECTION */}
      <label htmlFor="account" className="form-label">
        Account:
      </label>
      <ModalTimelines
        name="accountId"
        className="form-select"
        onChange={onChangeHandler}
        value={incomeFormData.accountId}
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
      {/* DATE SELECTION */}

      <label htmlFor="name" className="form-label1">
        Date:
      </label>
      <div>
        <DatePicker
          className="acctDetailsForm"
          type="text"
          name="incomeDate"
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            const formattedDate = moment(date).format("YYYY-MM-DD ");
            onChangeHandler({
              target: { name: "incomeDate", value: formattedDate },
            });
          }}
          value={incomeFormData.incomeDate || ""}
          isClearable
          showTimeSelect
        />
      </div>
      <br />
      <div className="frequencyForm">
        <label className="formFrequency">Is this transaction Reoccuring:</label>
        <div className="frequencyCheckbox">
          <div class="checkbox-wrapper-52">
            <label for="yes-52" className="item">
              <input
                type="radio"
                id="yes-52"
                className="hidden"
                name="incomeFrequency"
                onChange={onChangeHandler}
                value={incomeFormData.incomeFrequency || 1}
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
              name="incomeFrequency"
              onChange={onChangeHandler}
              value={
                incomeFormData.incomeFrequency
                  ? incomeFormData.incomeFrequency
                  : 0
              }
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
      <br />

      {/* END DATE */}
      {incomeFrequency === "1" && (
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
                  target: { name: "endDate", value: formattedDate },
                });
              }}
              value={incomeFormData.endDate || new Date()}
              isClearable
            />
          </div>
        </div>
      )}
      <br />
      <div className="popup-button">
        <button
          className="save-data"
          type="submit"
          onSubmit={() => toggleModal("income")}
        >
          {buttonLabel}
        </button>
        <button className="close-modal" onClick={() => toggleModal("income")}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default IncomeForm;
