import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import AccountImage from "../../images/AcctMgmnt.svg";
import BudgetImage from "../../images/BudgetMgmnt.svg";
import TutorialImage from "../../images/FinTutorial.svg";
import "swiper/css";
import "swiper/css/pagination";
import "../../App.css";
import { Pagination } from "swiper/modules";

const FinancialEducation = () => {
  return (
    <div>
      <div>Learn</div>
      <h5>What is Personal Budgeting ?</h5>
      <p>
        Personal budgeting is the process of creating a plan for how you will
        manage your money. It involves tracking your income and expenses to
        ensure that you are spending within your means and achieving your
        financial goals.
      </p>
      <h5>Benefits of Personal Budgeting ?</h5>
      <ul>
        <li>
          Financial Awareness: Understand where your money goes. Control Over
        </li>
        <li>Spending: Prevent overspending and live within your means.</li>
        <li>
          Achieving Financial Goals: Prioritize and allocate funds effectively.
        </li>
        <li> Emergency Preparedness: Have savings for unexpected expenses. </li>
        <li>Reducing Debt: Allocate funds for debt repayment.</li>
        <li>
          Improving Credit Score: Better manage credit utilization and payments.
        </li>
        <li>
          Less Financial Stress: Feel more secure and less anxious about money.
        </li>
        <li>
          Building Wealth: Save and invest for long-term financial security.
        </li>
        <li>
          Enhancing Decision-Making: Make informed financial decisions. Creating
        </li>
        <li>
          Financial Discipline: Develop responsible money management habits.
        </li>
      </ul>
      <h5>LEARN MORE</h5>
      <div>
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
            <Link to="/finEducation/accountmanagement">
              <div>
                <img src={AccountImage} />
              </div>
              <h6>Account Management</h6>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/finEducation/budgetmanagement">
              <div>
                <img src={BudgetImage} />
              </div>
              <h6>Budget Management</h6>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/finEducation/tutorial">
              <div>
                <img src={TutorialImage} />
              </div>
              <h6>FinSmart Tutorial</h6>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default FinancialEducation;
