import React from 'react';
import styled from "styled-components";

const ExpenseCategory = styled.select`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  right: 200px;
  bottom: 90px;
  background: rgb(59, 10, 84);
  border-radius: 4px;
  border: none;
  outline: none;
`;

const ExpensesFilter = ({filterItem}) => {
  return (
    <>
      <ExpenseCategory name="" id="" mb-3 onChange={(event) => filterItem(event.target.value)}>
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
}

export default ExpensesFilter