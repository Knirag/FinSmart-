import React, { useState } from "react";
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

const ExpensesFilter = ({ onChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    "",
    "Housing",
    "Utilities",
    "Transport",
    "Savings & Investments",
    "Groceries",
    "Education",
    "Entertainment",
    "Shopping",
    "Miscellaneous",
  ];

  const handleChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onChange(category);
  };

  return (
    <ExpenseCategory value={selectedCategory} onChange={handleChange}>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </ExpenseCategory>
  );
};

export default ExpensesFilter;
