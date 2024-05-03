import React from 'react';
import styled from "styled-components";

const ExpenseCategory = styled.select`
  background: rgb(59, 10, 84);
  height: 20px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #e1e9fc;
  font-size: 10px;
  justify-content: flex-end;
  position: relative;
  right: 187px;
  bottom: 190px;
  border-radius: 1.5px;
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.5);
  position: absolute;
  &:hover {
    cursor: pointer;
  }
`;

const ExpensesFilter = ({ expenses, filterItem }) => {
  
  return (
    <>
      <ExpenseCategory
        name=""
        id=""
        mb-3
        onChange={(event) => filterItem(event.target.value)}
      >
        <option value="">Category</option>
        <option value="Housing">Housing</option>
        <option value="Utilities">Utilities</option>
        <option value="Transport">Transport</option>
        <option value="Savings">Savings & Investments</option>
        <option value="Groceries">Groceries</option>
        <option value="Education">Education</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Shopping">Shopping</option>
        <option value="Miscelleneous">Miscelleneous</option>
      </ExpenseCategory>
    </>
  );
};

export default ExpensesFilter