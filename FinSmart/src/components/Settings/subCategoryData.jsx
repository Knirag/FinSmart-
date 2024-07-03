import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GoTrash } from "react-icons/go";
import axios from "axios";
import { baseUrl } from "../../utils";
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
    0 0 20px rgba(255, 255, 255, 0.2), inset 0 0 10px hsl(310, 100%, 54%),
    0 0 40px #9e25d69d, 0 0 80px #d553f9ab;
`;

const SubCategoryData = ({ catData, fetchCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(catData);
  }, [catData]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    axios
      .get(`${baseUrl}/category`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  const deleteSubCat = (subCategoryId) => {
    const authToken = localStorage.getItem("authToken");

    axios
      .delete(`${baseUrl}/category/subcategory/${subCategoryId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(() => {
        setCategories((prevCategories) =>
          prevCategories.map((category) => ({
            ...category,
            subcategory: category.subcategory.filter(
              (subcategory) => subcategory.subCategoryId !== subCategoryId
            ),
          }))
        );
      })
      .catch((err) => {
        console.error("Error deleting subcategory:", err);
      });
  };

  return (
    <SubCategoryContainer>
      {categories.map((category) => (
        <div key={category.categoryId}>
          <SubCatContainer>
            <div className="categoryLabelContainer">
              <MdStarPurple500 />
              <h3 className="subCatCategoryLabel">{category.categoryName}:</h3>
            </div>
            <div className="subCatList">
              {category.subcategory && category.subcategory.length > 0 ? (
                category.subcategory.map((subcategory) => (
                  <div key={subcategory.subCategoryId}>
                    <div className="subCatContainer">
                      <h6 className="subCatLabel">
                        {subcategory.subCategoryName}
                      </h6>
                      <button
                        className="deleteCategory"
                        onClick={() => deleteSubCat(subcategory.subCategoryId)}
                      >
                        <GoTrash />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>No subcategories available</div>
              )}
            </div>
          </SubCatContainer>
        </div>
      ))}
    </SubCategoryContainer>
  );
};

export default SubCategoryData;
