import React from "react";
import styled from "styled-components";
import { GoTrash } from "react-icons/go";
import { MdStarPurple500 } from "react-icons/md";
import "../../App.css";

const SubCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 90px;
  width: 900px;
  height: 100%;
  background: none;
  outline: none;
  border: none;
`;
const SubCatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 30px;
  width: 900px;
  height: 100%;
  background: rgb(59, 10, 84);
  color: "#05f7d3";
  border-radius: 9px;
  box-shadow: 0px 5px 10px 0px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(255, 255, 255, 0.2);
`;

const SubCategoryData = () => {
  const subCatData = JSON.parse(localStorage.getItem("subCatData")) || [];

  const getSubCat = (categoryName) => {
    return subCatData.filter(
      (subcategory) => subcategory.category === categoryName
    );
  };

  const deleteCategory = (id) => {
    const updatedSubCategoryData = subCatData.filter(
      (subcategory) => subcategory.id !== id
    );
    localStorage.setItem("subCatData", JSON.stringify(updatedSubCategoryData));
    window.location.reload();
  };

  const categoryData = JSON.parse(localStorage.getItem("categoryData")) || [];

  return (
    <SubCategoryContainer>
      {/* Display SubCategories */}
      {categoryData.map((category) => (
        <div key={category.id}>
          <SubCatContainer>
            <div className="categoryLabelContainer">
              <MdStarPurple500 />
              <h3 className="subCatCategoryLabel">{category.name}:</h3>
            </div>
            <h6>
              <div className="subCatList">
                {getSubCat(category.name).map((subcategory) => (
                  <div key={subcategory.id}>
                    <div className="subCatContainer">
                      <h6 className="subCatLabel">{subcategory.name}</h6>

                      <button
                        className="deleteCategory"
                        onClick={() => deleteCategory(subcategory.id)}
                      >
                        <GoTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </h6>
          </SubCatContainer>
        </div>
      ))}
    </SubCategoryContainer>
  );
};

export default SubCategoryData;
