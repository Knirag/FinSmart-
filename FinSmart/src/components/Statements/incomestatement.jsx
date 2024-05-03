import React from 'react';
import MonthlyFilter from '../Homepage/MonthlyFilter';
import styled from "styled-components";

const StatementContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 90px;
  width: 700px;
  height: 100%;
  background: rgb(185, 104, 249);
  background: radial-gradient(
    circle,
    rgba(185, 104, 249, 0.6998521820837711) 0%,
    rgba(70, 38, 94, 1) 100%
  );

  border-radius: 9px;
  box-shadow: 0px 5px 10px 0px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(255, 255, 255, 0.2);
`;
const IncomeStatement = () => {
  return (
    <div>
      <MonthlyFilter />
      <h4>Monthly Personal Statement</h4>
      <StatementContainer>
        {/* Header */}
        <h6 className="topRow">Total Income</h6>
        <span></span>
        <h6 className="topRow">Total Expenses</h6>
        <span></span>
        <h6 className="topRow">Net(Income-Expenses)</h6>
        <span></span>
        {/* Income */}
        <h3>INCOME</h3>
        <h6 className="incomeRow">Source 1</h6>
        <span></span>
        <h6 className="incomeRow">Source 2</h6>
        <span></span>
        {/* EXPENSES */}
        <h3>EXPENSES</h3>
        {/* Category 1 */}
        <h5>Housing</h5>
        <h6 className="expenseRow">Expense 1</h6>
        <span></span>
        <h6 className="expenseRow">Expense 2</h6>
        <span></span>
        <h6 className="expenseRow">Expense 3</h6>
        <span></span>
        {/* Category 2 */}
        <h5>Utilities</h5>
        <h6 className="expenseRow">Expense 4</h6>
        <span></span>
        <h6 className="expenseRow">Expense 5</h6>
        <span></span>
        <h6 className="expenseRow">Expense 6</h6>
        <span></span>
        {/* Category 3 */}
        <h5>Transport</h5>
        <h6 className="expenseRow">Expense 7</h6>
        <span></span>
        <h6 className="expenseRow">Expense 8</h6>
        <span></span>
        <h6 className="expenseRow">Expense 9</h6>
        <span></span>
        {/* Category 4 */}
        <h5>Transport</h5>
        <h6 className="expenseRow">Expense 10</h6>
        <span></span>
        <h6 className="expenseRow">Expense 11</h6>
        <span></span>
        <h6 className="expenseRow">Expense 12</h6>
        <span></span>
        {/* Category 5 */}
        <h5>Savings & Investment</h5>
        <h6 className="expenseRow">Expense 13</h6>
        <span></span>
        <h6 className="expenseRow">Expense 14</h6>
        <span></span>
        <h6 className="expenseRow">Expense 15</h6>
        <span></span>
        {/* Category 6 */}
        <h5>Groceries</h5>
        <h6 className="expenseRow">Expense 16</h6>
        <span></span>
        <h6 className="expenseRow">Expense 17</h6>
        <span></span>
        <h6 className="expenseRow">Expense 18</h6>
        <span></span>
        {/* Category 7 */}
        <h5>Education</h5>
        <h6 className="expenseRow">Expense 19</h6>
        <span></span>
        <h6 className="expenseRow">Expense 20</h6>
        <span></span>
        <h6 className="expenseRow">Expense 21</h6>
        <span></span>
        {/* Category 8 */}
        <h5>Entertainment</h5>
        <h6 className="expenseRow">Expense 22</h6>
        <span></span>
        <h6 className="expenseRow">Expense 23</h6>
        <span></span>
        <h6 className="expenseRow">Expense 24</h6>
        <span></span>
        {/* Category 9 */}
        <h5>Shopping</h5>
        <h6 className="expenseRow">Expense 25</h6>
        <span></span>
        <h6 className="expenseRow">Expense 26</h6>
        <span></span>
        <h6 className="expenseRow">Expense 27</h6>
        <span></span>
        {/* Category 10 */}
        <h5>Education</h5>
        <h6 className="expenseRow">Expense 28</h6>
        <span></span>
        <h6 className="expenseRow">Expense 29</h6>
        <span></span>
        <h6 className="expenseRow">Expense 30</h6>
        <span></span>
      </StatementContainer>
    </div>
  );
}

export default IncomeStatement