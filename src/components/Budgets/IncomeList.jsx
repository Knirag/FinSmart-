import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { ImPencil2 } from "react-icons/im";
import { baseUrl } from "../../utils";
import { GoTrash } from "react-icons/go";
import { BsPlusCircleDotted } from "react-icons/bs";
import moment from "moment";

const BudgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 43px;
  width: 900px;
  height: 100%;
  background: rgb(59, 10, 84);
  border-radius: 9px;
  box-shadow: 0px 5px 10px 0px rgba(17, 255, 0, 0.5),
    0 0 20px rgba(255, 255, 255, 0.2), inset 0 0 10px hsl(132.94117647058823, 100%, 50%),
    0 0 40px #083f109d, 0 0 80px #560593ab;
`;

const IncomeList = ({ incomeData, toggleModal}) => {
  const [incomeList, setIncomeList] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [checkedState, setCheckedState] = useState({});

  useEffect(() => {
    setIncomeList(incomeData);
  }, [incomeData]);
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const fetchAccounts = async () => {
      try {
        const accountsRes = await axios.get(`${baseUrl}/accounts`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setAccounts(accountsRes.data);
      } catch (err) {
        console.log("Error fetching accounts:", err);
      }
    };
    fetchAccounts();
  }, []);

    useEffect(() => {
      const initialCheckedState = {};
      const updatedIncome = incomeData.map((income) => {
        const incomeDate = moment(income.incomeDate);
        if (
          incomeDate.isSameOrBefore(moment(), "day") &&
          income.processed !== 1
        ) {
          updateAccountBalance(
            income.account.accountName,
            income.incomeAmount,
            income.incomeId
          );
          initialCheckedState[income.incomeId] = true;
          return { ...income, processed: 1 };
        } else {
          initialCheckedState[income.incomeId] = income.processed === 1;
          return income;
        }
      });

      setCheckedState(initialCheckedState);
      setIncomeList(updatedIncome);
    }, [incomeData]);

    const updateAccountBalance = async (
      accountName,
      incomeAmount,
      incomeId
    ) => {
      const account = accounts.find((acc) => acc.accountName === accountName);
      if (account) {
        const newAccountBalance =
          parseInt(account.accountBalance) + parseInt(incomeAmount);
        const updatedAccount = {
          ...account,
          accountBalance: newAccountBalance,
        };

        try {
          await axios.put(
            `${baseUrl}/income/${incomeId}`,
            { processed: 1 },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          );

          await axios.put(
            `${baseUrl}/accounts/${account.accountId}`,
            updatedAccount,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          );

          setAccounts((prevAccounts) =>
            prevAccounts.map((acc) =>
              acc.accountId === account.accountId ? updatedAccount : acc
            )
          );

          setIncomeList((prevIncomeList) =>
            prevIncomeList.map((income) =>
              income.incomeId === incomeId
                ? { ...income, processed: 1 }
                : income
            )
          );
        } catch (err) {
          console.error(
            "Error updating account balance or processing income:",
            err
          );
        }
      }
    };

    const handleCheckboxChange = (
      incomeId,
      accountName,
      incomeAmount,
      event
    ) => {
      const checked = event.target.checked;
      setCheckedState((prevState) => ({
        ...prevState,
        [incomeId]: checked,
      }));
      if (checked) {
        updateAccountBalance(accountName, incomeAmount, incomeId);
      }
    };

  const deleteIncome = (incomeId) => {
    const authToken = localStorage.getItem("authToken");
    axios
      .delete(`${baseUrl}/income/${incomeId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        console.log("Income deleted:", res.data);
        setIncomeList((prevInc) =>
          prevInc.filter((inc) => inc.incomeId !== incomeId)
        );
      })
      .catch((err) => {
        console.error("Error deleting income:", err);
      });
  };

  return (
    <div className="incomeListingContainer">
      {incomeList?.length > 0 ? (
        incomeList?.map((inc) => (
          <BudgetContainer key={inc.incomeId}>
            <div className="incomeHeading">
              <div className="incomeTitle">
                <i className="income-Icon">
                  <BsPlusCircleDotted />
                </i>
                <h5 className="incomeLabelName">{inc.incomeDescription}</h5>
              </div>
              <span className="incomeAmountColumn">
                {parseInt(inc.incomeAmount).toLocaleString()} Frw
              </span>
            </div>
            <div className="incomeDetailsCol">
              <div className="incomeRow">
                <h5 className="incomeDetailHeadings">Account:</h5>
                <span className="incomeDetails">
                  {inc?.account.accountName}
                </span>
              </div>
              <div className="incomeRow">
                <h5 className="incomeDetailHeadings">Date Scheduled:</h5>
                <span className="incomeDetails">
                  {moment(inc.incomeDate).format("MMMM Do YYYY")}
                </span>
              </div>
              <div className="incomeRow">
                <h5 className="incomeLabel">
                  {inc.incomeFrequency ? "Recurring" : ""}
                  {inc.endDate
                    ? ` till ${moment(inc.endDate).format("MMMM Do YYYY")}`
                    : ""}
                </h5>
              </div>
            </div>
            <div className="incomeActions">
              <div className="incomeBalanceTransaction">
                <div clasaName="checkbox-processed">
                  <div className="checkbox-wrapper-39">
                    <label>
                      <input
                        type="checkbox"
                        checked={checkedState[inc.incomeId] || false}
                        onChange={(e) =>
                          handleCheckboxChange(
                            inc.incomeId,
                            inc.account.accountName,
                            inc.incomeAmount,
                            e
                          )
                        }
                      />
                      <span className="checkbox"></span>
                    </label>
                  </div>
              </div>
                </div>
              <div className="modify_Items">
                <button
                  className="editItems"
                  onClick={() => toggleModal("income", inc)}
                >
                  <ImPencil2 />
                  <h6 className="historyBtnLabel">EDIT</h6>
                </button>
                <button
                  className="deleteItems"
                  onClick={() => deleteIncome(inc.incomeId)}
                >
                  <GoTrash />
                  <h6 className="historyBtnLabel">Delete</h6>
                </button>
              </div>
            </div>
          </BudgetContainer>
        ))
      ) : (
        <BudgetContainer>
          <h4 className="infoMessage">Add Budget Data</h4>
        </BudgetContainer>
      )}
    </div>
  );
};

export default IncomeList;

