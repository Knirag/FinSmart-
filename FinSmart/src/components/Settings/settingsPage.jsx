import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { baseUrl } from "../../utils";
import { HiOutlinePlus } from "react-icons/hi2";
import { MdOutlineCategory } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import CategoryList from "./categoryData";
import CategoryForm from "./categoryForm";
import SubCatForm from "./subcategoryform";
import SubCategoryData from "./subCategoryData";
import "../../App.css";

const SettingsHeader = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  left: 100px;
  top: 24px;
  box-shadow: 0px 5px 10px 0px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(255, 255, 255, 0.2), inset 0 0 10px hsl(310, 100%, 54%),
    0 0 40px #9e25d69d, 0 0 80px #d553f9ab;
`;
const BudgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 90px;
  width: 900px;
  height: 100%;
  background: rgb(59, 10, 84);
  color: #05f7d3;
  border-radius: 9px;
  box-shadow: 0px 5px 10px 0px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(255, 255, 255, 0.2), inset 0 0 10px hsl(310, 100%, 54%),
    0 0 40px #9e25d69d, 0 0 80px #d553f9ab;
`;
const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
`;
const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(49, 49, 49, 0.8);
  position: fixed;
`;
const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: rgb(59, 10, 84);
  padding: 14px 28px;
  border-radius: 3px;
  min-height: 200px;
  min-width: 300px;
`;

const Settings = () => {
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [category, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryData = async () => {
  const authToken = localStorage.getItem("authToken");
  const category = await axios
    .get(`${baseUrl}/category`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    });
  setCategoryData(category.data);
};

useEffect(() => {
  fetchCategoryData();
}, []);

  const toggleModal = (type) => {
    setModalType(type);
    setModal(!modal);
    if (!modal) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  };
const fetchedCategory = (data) => setSelectedCategory(data);
  return (
    <div>
      <SettingsHeader>
        <h3 className="Acc">Settings</h3>
      </SettingsHeader>

      {/* <BudgetContainer>
        <h5>Account:</h5>
      </BudgetContainer> */}
      {/* Category Div */}
      <div className="catHeading">
        <h5>
          <MdCategory />
          <h4 className="catName">Categories:</h4>
        </h5>
      </div>
      <BudgetContainer>
        <button className="addCatBtn" onClick={() => toggleModal("category")}>
          <HiOutlinePlus />
          <h6 className="addCatLabel">Category</h6>
        </button>
        <CategoryList catData={category} toggleModal={toggleModal} sendCategory={fetchedCategory}/>
        {/* CATEGORY MODAL */}
        {modal && (modalType === "category" || modalType === "addCategory") && (
          <Modal>
            <Overlay>
              <ModalContent>
                <h5 style={{ color: "#ffff" }}>Category</h5>
                <CategoryForm
                  fetchCategory={fetchCategoryData}
                  toggleModal={toggleModal}
                  category={selectedCategory}
                />
              </ModalContent>
            </Overlay>
          </Modal>
        )}
      </BudgetContainer>
      {/* Sub-Category Section */}
      <div className="subCategorySection">
        <div className="subCatHeading">
          <MdOutlineCategory />
          <h4 className="subcatName">Subcategories:</h4>

          <button
            className="addSubCatBtn"
            onClick={() => toggleModal("subcategory")}
          >
            <HiOutlinePlus />
            <h6 className="subCatBtnLabel">SubCategory</h6>
          </button>
        </div>
        <SubCategoryData catData={category} fetchCategory={fetchCategoryData} />
        {/* SubCategory Modal */}
        {modal && modalType === "subcategory" && (
          <Modal>
            <Overlay>
              <ModalContent>
                <h5 style={{ color: "#ffff" }}>Subcategory</h5>
                <SubCatForm
                  fetchSubCat={fetchCategoryData}
                  toggleModal={toggleModal}
                />
                {/* Button */}
              
              </ModalContent>
            </Overlay>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Settings;
