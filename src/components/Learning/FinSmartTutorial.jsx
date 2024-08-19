import React from "react";
import { Content,ContentCards } from "./AccountManagement.jsx";
import "../../App.css";
import { Link } from "react-router-dom";

import { ButtonRow } from "./BudgetManagement";


const FinSmartTutorial = () => {
  return (
    <div>
      <Content>
        <h5 className="acct-management-Label">FinSmart Video Tutorial</h5>
        <div className="video-thumbnail">
          <iframe

            width="560"
            height="315"
            src="https://www.youtube.com/embed/GIzUKr31j78"
            title="FinSmart Video Tutorial"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </Content>

      <ContentCards>
        <h5 className="acct-management-Label">About FinSmart</h5>
        <p className="planning-info">
          FinSmart is a comprehensive financial management tool designed to help
          users take control of their finances. Our platform offers a range of
          features to simplify budgeting, track expenses, and manage
          subscriptions.
        </p>
        <p className="tutorial-features">Key features include:</p>
        <ul className="tools-list">
          <li className="tutorial-row">
            <h6 className="feature-label">Dashboard: </h6>A powerful analytics
            tool that provides a comprehensive overview of your monthly
            transactions with visual data, account information, and transaction
            reminders.
          </li>
          <li className="tutorial-row">
            <h6 className="feature-label">Income Statement: </h6>A detailed
            reporting tool that tracks your income, expenses, and net profit or
            loss over a specified period.
          </li>
          <li className="tutorial-row">
            <h6 className="feature-label">Recurring Transactions: </h6>Easily
            set up recurring expenses for convenience, ensuring regular expenses
            are automatically tracked.
          </li>
          <li className="tutorial-row">
            <h6 className="feature-label">Expense Tracking:</h6> Monitor your
            spending habits and financial status with detailed insights on the
            Transactions page.
          </li>
          <li className="tutorial-row">
            <h6 className="feature-label">Income Tracking: </h6> Keep track of
            your income dates and receive reminders to stay on top of your
            financial commitments.
          </li>
        </ul>

        <p className="planning-info">
          Our mission is to provide users with the tools they need to manage
          their finances effectively, helping them to achieve their financial
          goals and improve their financial literacy.
        </p>
      </ContentCards>
      <ButtonRow>
        <Link to="/finEducation/budgetmanagement" className="course-label">
          <button className="next-page">Previous</button>
        </Link>
        <Link to="/accounts" className="course-label">
          <button className="next-page">Start</button>
        </Link>
      </ButtonRow>
    </div>
  );
};

export default FinSmartTutorial;
