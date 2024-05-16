import React, {useEffect, useState} from "react";
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
  color: "#05f7d3";
`;

const CategoryList = ({toggleModal}) => {
   const [categoryData, setCategoryData] = useState([]);

   useEffect(() => {
     const storedCategoryData = JSON.parse(
       localStorage.getItem("categoryData")
     );
     if (storedCategoryData !== null) {
       setCategoryData(storedCategoryData);
     }
   }, []);

    const deleteCategory = (id) => {
      const updatedCategoryData = categoryData.filter(
        (category) => category.id !== id
      );
      setCategoryData(updatedCategoryData);
      localStorage.setItem("categoryData", JSON.stringify(updatedCategoryData));
      windows.location.reload()
    };
  return (
    <CategoryContainer>
      <div className="categoryList">
      {categoryData?.map((category) => (
          <div key={category.id}>
            <div className="categoryContainer">
              <h6 className="categoryDivLabel">{category.name}</h6>
              <button
                className="editCategory"
                onClick={() => toggleModal("category", category)}
              >
                <HiMiniPencil />
              </button>
              <button
                className="deleteCategory"
                onClick={() => deleteCategory(category.id)}
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
