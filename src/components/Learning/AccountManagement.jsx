import react,{useState} from 'react';
import "../../App.css"
import { Link } from 'react-router-dom'
import styled from "styled-components";
import AccountNav from "./acctMgmntImages/Accounts SC.png"
import CreateAcc from "./acctMgmntImages/Account S1.png"
import AccountForm from "./acctMgmntImages/Account S2.png"
import {ButtonRow} from "./BudgetManagement"
export const Content = styled.div`
  max-width: 40 rem;
  margin: 4rem auto;

`;
export const ContentCards = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 90px;
  height: 100%;
  background: rgb(59, 10, 84);
  color: "#05f7d3";
  border-radius: 9px;
  box-shadow: 0px 5px 10px 0px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(255, 255, 255, 0.2), inset 0 0 10px hsl(310, 100%, 54%),
    0 0 40px #9e25d69d, 0 0 80px #d553f9ab;
    padding: 20px;
`;
const AccountManagement = () => {
  return (
    <div>
      <ContentCards>
        <h5 className="acct-management-Label">What is an Account</h5>
        <p className="acct-management-Info">
          An Account is a record used to classify & store Information about
          Individual transactions
        </p>
      </ContentCards>
      <Content>
        <h5 className="acct-management-Label">
          How to Create An Account in Finsmart
        </h5>
        <div className="acct-management-Tutorial">
          <img src={AccountNav} alt="Account Navigation" />
          <p className="image-tutorial-label">
            Navigate to this Link to Open the Account Page
          </p>
          <img src={CreateAcc} alt="Account Navigation" />
          <p className="image-tutorial-label">
            Click the + Icon to Open Form to Fill In Account Data
          </p>
          <img src={AccountForm} alt="Account Navigation" />
          <p className="image-tutorial-label">
            Fill In the Form to Create an Account
          </p>
        </div>
      </Content>
      <ContentCards>
        <h5 className="acct-management-Label">Types of Personal Accounts</h5>
        <ul className="acct-management-List">
          <li className="acct-management-Row">
            <h5 className="acct-managemnt-accounts-Label">Checking Account:</h5>

            <p className="acct-managemnt-accounts-Info">
              Used3 for everyday transactions such as deposits, withdrawals, and
              bill payments.
            </p>
          </li>
          <li className="acct-management-Row">
            <h5 className="acct-managemnt-accounts-Label">Savings Account:</h5>

            <p className="acct-managemnt-accounts-Info">
              Designed for saving money over time with interest earned on the
              balance.
            </p>
          </li>
          <li className="acct-management-Row">
            <h5 className="acct-managemnt-accounts-Label">
              Money Market Account:
            </h5>

            <p className="acct-managemnt-accounts-Info">
              Combines features of both checking and savings accounts, offering
              higher interest rates and limited check-writing and debit card
              access.
            </p>
          </li>
          <li className="acct-management-Row">
            <h5 className="acct-managemnt-accounts-Label">
              High-Yield Savings Account:
            </h5>

            <p className="acct-managemnt-accounts-Info">
              Offers higher interest rates than standard savings accounts,
              typically available through online banks.
            </p>
          </li>
          <li className="acct-management-Row">
            <h5 className="acct-managemnt-accounts-Label">
              Investment Account:
            </h5>

            <p className="acct-managemnt-accounts-Info">
              Used to hold and invest in various financial assets like stocks,
              bonds, and mutual funds.
            </p>
          </li>
          <li className="acct-management-Row">
            <h5 className="acct-managemnt-accounts-Label"> Joint Account:</h5>

            <p className="acct-managemnt-accounts-Info">
              Shared account between two or more individuals, often used by
              couples or family members, with equal access to the funds.
            </p>
          </li>
          <li className="acct-management-Row">
            <h5 className="acct-managemnt-accounts-Label">
              Individual Retirement Account (IRA):
            </h5>

            <p className="acct-managemnt-accounts-Info">
              Designed for retirement savings with tax advantages, available as
              Traditional IRA and Roth IRA.
            </p>
          </li>

          <h4 className="learn-more">
            Learn More on Accounts :
            <Link
              to="https://www.forbes.com/advisor/banking/what-are-the-different-types-of-bank-accounts/"
              className="learn-more-link"
            >
              Click Here
            </Link>
          </h4>
        </ul>
      </ContentCards>

      <ContentCards>
        <h5 className="acct-management-Label">
          Managing Subscriptions & Bills with FinSmart
        </h5>
        <p className="bills-info">
          Managing Subscriptions and recurring expenses like Bills with FinSmart
          is easy:
        </p>
        <span className="bills-info-2">
          Start by creating a subscription category or subcategory. <br />
          Register an expense under it and, for convenience, set it as a
          recurring expense for the rest of the year.
        </span>
        <p className="bills-info-example">
          For example, in the settings page, create a category called
          "Entertainment." Then, create a subcategory under it called
          "Subscriptions." Navigate to the budget page and create an expense
          called "Netflix." Select the account, set the expense category to
          "Entertainment" and the subcategory to "Subscriptions." Mark it as a
          recurring expense, set an end date, and save. The amount will be
          deducted on the same date each month until the end date you set.
        </p>
      </ContentCards>
      <ButtonRow>
        <Link to="/finEducation/budgetmanagement" className="course-label">
          <button className="next-page">NEXT</button>
        </Link>
      </ButtonRow>
    </div>
  );
}

export default AccountManagement