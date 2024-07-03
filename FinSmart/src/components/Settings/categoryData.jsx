import React, {useEffect, useState} from "react";
import axios from "axios";
import { baseUrl } from "../../utils";
import styled from "styled-components";
import { HiMiniPencil } from "react-icons/hi2";
import { GoTrash } from "react-icons/go";
import "../../App.css";


const CategoryContainer = styled.div`
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

const CategoryList = ({ catData, SubCategoryData, sendCategory, toggleModal }) => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    setCategoryData(catData);
  }, [catData,SubCategoryData]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    axios
      .get(`${baseUrl}/category`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        return setCategoryData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  const deleteCategory = (categoryId) => {
    const authToken = localStorage.getItem("authToken");
    axios
      .delete(`${baseUrl}/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        console.log("Category deleted:", res.data);
        setCategoryData((prevCategories) =>
          prevCategories.filter(
            (category) => category.categoryId !== categoryId
          )
        );
      })
      .catch((err) => {
        console.error("Error deleting category:", err);
      });
  };
  return (
    <CategoryContainer>
      <div className="categoryList">
        {categoryData?.map((category) => (
          <div key={category.categoryId}>
            <div className="categoryContainer">
              <h6 className="categoryDivLabel">{category.categoryName}</h6>
              <button
                className="editCategory"
                onClick={() =>{
                  toggleModal("category", category);
                  sendCategory(category);
                }}
              >
                <HiMiniPencil />
              </button>
              <button
                className="deleteCategory"
                onClick={() => deleteCategory(category.categoryId)}
              >
                <GoTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </CategoryContainer>
  );
};

export default CategoryList;
