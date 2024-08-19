import react, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Content, ContentCards } from "./AccountManagement.jsx";
import BudgetStep1 from "./budgetMgmntImages/budget-step1.png";
import BudgetStep2 from "./budgetMgmntImages/budget-step2.png";
import BudgetStep3 from "./budgetMgmntImages/budget-income-step3.png";
import BudgetStep4 from "./budgetMgmntImages/budget-expense-step3.png";
import BudgetStep5 from "./budgetMgmntImages/budget-last-step.png";
import "../../App.css";

export const ButtonRow = styled.div`
  max-width: 40 rem;
  margin: 4rem auto;
  display: flex;
  justify-content: space-between;
`;
const BudgetManagement = () => {
  return (
    <div>
      <Content>
        <h5 className="acct-management-Label">Setting up your budget</h5>
        <div className="acct-management-Tutorial">
          <img src={BudgetStep1} alt="Budget Step 1" />
          <p className="image-tutorial-label">
            Start by navigating to budgets on the SideMenu
          </p>
        </div>
        <div className="acct-management-Tutorial">
          <img src={BudgetStep2} alt="Budget Step 2" />
          <p className="image-tutorial-label">
            On the Right corner click on the Spend or Income buttons to record
            income or expenses respectively.
          </p>
        </div>
        <div className="acct-management-Tutorial">
          <img src={BudgetStep3} alt="Budget Step 3" />
          <p className="image-tutorial-label">
            After clicking the + Income button the the following form will be
            displayed for you to enter your income details.
          </p>
        </div>
        <div className="acct-management-Tutorial">
          <img src={BudgetStep4} alt="Budget Step 4" />
          <p className="image-tutorial-label">
            After clicking the - Expense button the the following form will be
            displayed for you to enter your expense details.
          </p>
        </div>
        <div className="acct-management-Tutorial">
          <img src={BudgetStep5} alt="Budget Step 5" />
          <p className="image-tutorial-label">
            This is what your created income (in a green bordered container) &
            expense( in the red bordered container) will be displayed.
          </p>
        </div>
      </Content>
      <ContentCards>
        <h5 className="acct-management-Label">Budgeting Application Tools</h5>
        <span className="tools-paragraph">
          FinSmart provides the following budget tracking tools to ease the
          process of recording & tracking spending & income:
        </span>
        <ul className="tools-list">
          <li className="tools-row">
            <h6 className="tool-label">Budget Page:</h6>
            <span className="tool-info">
              The FinSmart budget page is for recording and displaying expense &
              income data the page contains both type of transactions forms &
              also displays them.
            </span>
          </li>
          <li className="tools-row">
            <h6 className="tool-label">Transactions Page:</h6>
            <span className="tool-info">
              The transactions page allows users an easier view of transactions
              on a month by month basis, access transaction type totals and also
              sort by the same types.{" "}
            </span>
          </li>
          <li className="tools-row">
            <h6 className="tool-label">Statement Page:</h6>
            <span className="tool-info">
              The Statement Page is a more formalized version of the Transaction
              & Budget Pages, it utilizes pagination to display transaction
              records.
              <br /> The page also allows you to download in .xlsc format(Excel)
              your monthly transactions.
            </span>
          </li>
          <li className="tools-row">
            <h6 className="tool-label">Dashboard:</h6>
            <span className="tool-info">
              The dashboard is your go-to page for viewing your monthly
              transactions. It features visual data in the form of charts,
              provides account information, and includes transaction reminders.
            </span>
          </li>
        </ul>
      </ContentCards>
      <ContentCards>
        <h5 className="acct-management-Label">Financial Planning</h5>
        <p className="planning-info">
          Financial planning involves setting goals, creating strategies to
          achieve them, and tracking your progress. It helps you manage your
          finances efficiently and prepare for future expenses.
        </p>
        <p className="planning-info">
          With our app, users can easily record transactions and set them as
          recurring for convenience. This ensures that regular expenses, such as
          subscriptions or utility bills, are automatically tracked without
          needing manual entry each time.
        </p>
        <p className="planning-info">
          These recurring transactions are reflected in both the Income
          Statement and the Transactions page, allowing users to see a
          comprehensive view of their spending habits and financial status.
        </p>
        <p className="planning-info">
          Additionally, the app tracks income dates and provides reminders,
          helping users stay on top of their financial commitments and ensuring
          they never miss an important transaction or payment.
        </p>
      </ContentCards>

      <ContentCards>
        <h5 className="acct-management-Label">Using Report & Analytics</h5>
        <p className="planning-info">
          The dashboard serves as a powerful analytics tool, providing a
          comprehensive overview of your monthly transactions. It includes
          visual data in the form of charts, account information, and
          transaction reminders, allowing you to quickly assess your financial
          situation and make informed decisions.
        </p>
        <p className="planning-info">
          The income statement functions as a reporting tool, offering detailed
          insights into your financial activities over a specified period. It
          helps you track your income, expenses, and net profit or loss,
          enabling you to monitor your financial health and plan accordingly.
        </p>
      </ContentCards>

      <ContentCards>
        <h5 className="acct-management-Label"> Resources</h5>
        <ul className="resources-list">
          <li className="resource-info">
            <Link
              to="https://bettermoneyhabits.bankofamerica.com/en/saving-budgeting/creating-a-budget"
              className="learn-more-link"
            >
              <span>Better Money Habits</span>
            </Link>
          </li>
          <li className="resource-info">
            <Link
              to="https://www.investopedia.com/terms/f/financial_plan.asp#:~:text=Financial%20planning%20involves%20a%20thorough,of%20a%20certified%20financial%20planner."
              className="learn-more-link"
            >
              <span>Financial Plans</span>
            </Link>
          </li>
        </ul>
      </ContentCards>
      <ButtonRow>
        <Link to="/finEducation/accountmanagement" className="course-label">
          <button className="next-page">Previous</button>
        </Link>
        <Link to="/finEducation/tutorial" className="course-label">
          <button className="next-page">NEXT</button>
        </Link>
      </ButtonRow>
    </div>
  );
};

export default BudgetManagement;
