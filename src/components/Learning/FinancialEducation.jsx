import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import AccountImage from "../../images/AcctMgmnt.svg";
import BudgetImage from "../../images/BudgetMgmnt.svg";
import styled from "styled-components"
import TutorialImage from "../../images/FinTutorial.svg";
import Squarebg from "../../images/testbg.svg";
import "swiper/css";
import "swiper/css/pagination";
import "../../App.css";
import { Pagination } from "swiper/modules";
import { AccountHeader } from "../Accounts/Accounts";

const LearningContainer = styled.div`
  background-image: url(${Squarebg});
  background-size: contain;
  background-blend-mode: linear;
  background-origin: border-box;
  background-repeat: no repeat;
  height: 100vh;
`;

const FinancialEducation = () => {
  return (
    <LearningContainer>
      <AccountHeader>
        <h3 className="Acc">Learn</h3>
      </AccountHeader>
      <div className="learning-content">
        <div className="definition-container">
          <h5 className="budgeting-Title">What is Personal Budgeting ?</h5>
          <p className="budget-definition">
            Personal budgeting is the process of creating a plan for how you
            will manage your money.
            <br /> It involves tracking your income and expenses to ensure that
            you are spending within your means and achieving your financial
            goals.
          </p>
        </div>
        <div className="benefits-container">
          <h5 className="budgeting-Title">Benefits of Personal Budgeting ?</h5>
          <ol className="benefits-list">
            <li className="benefits-row">
              <h5 className="benefit-label">Financial Awareness:</h5>
              <span className="benefit-info">
                Understand where your money goes.
              </span>
            </li>
            <li className="benefits-row">
              <h5 className="benefit-label">Control Over Spending:</h5>
              <span className="benefit-info">
                Prevent overspending and live within your means.
              </span>
            </li>
            <li className="benefits-row">
              <h5 className="benefit-label">Achieving Financial Goals:</h5>
              <span className="benefit-info">
                Prioritize and allocate funds effectively.
              </span>
            </li>
            <li className="benefits-row">
              <h5 className="benefit-label">Emergency Preparedness: </h5>
              <span className="benefit-info">
                Have savings for unexpected expenses.
              </span>
            </li>

            <li className="benefits-row">
              <h5 className="benefit-label">Less Financial Stress: </h5>
              <span className="benefit-info">
                Feel more secure and less anxious about money.
              </span>
            </li>
            <li className="benefits-row">
              <h5 className="benefit-label">Building Wealth: </h5>
              <span className="benefit-info">
                Save and invest for long-term financial security.
              </span>
            </li>
            <li className="benefits-row">
              <h5 className="benefit-label">Enhancing Decision-Making: </h5>
              <span className="benefit-info">
                Make informed financial decisions.
              </span>
            </li>
            <li className="benefits-row">
              <h5 className="benefit-label">Creating Financial Discipline: </h5>
              <span className="benefit-info">
                Develop responsible money management habits.
              </span>
            </li>
          </ol>
        </div>
        <div className="swiper-container">
          <h5 className="budgeting-Title">LEARN MORE</h5>
          <div className="">
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 50,
                },
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              <SwiperSlide>
                <Link
                  to="/finEducation/accountmanagement"
                  className="course-label"
                >
                  <div className="course-Image">
                    <img src={AccountImage} />
                  </div>
                  <h6 className="course-name">Account Management</h6>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link
                  to="/finEducation/budgetmanagement"
                  className="course-label"
                >
                  <div>
                    <img src={BudgetImage} />
                  </div>
                  <h6 className="course-name">Budget Management</h6>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/finEducation/tutorial" className="course-label">
                  <div>
                    <img src={TutorialImage} />
                  </div>
                  <h6 className="course-name">FinSmart Tutorial</h6>
                </Link>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </LearningContainer>
  );
};

export default FinancialEducation;
