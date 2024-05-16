import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ModalTimelines = styled.select`
  background: rgb(59, 10, 84);
  height: 28px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #e1e9fc;
  font-size: 13px;
  text-align: center;
  width: 335px;
  margin: 0 auto;
  padding: 3px;
  border: 1px solid #732982;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
    box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5),
      0 0 20px rgba(255, 255, 255, 0.2);
    outline-offset: 15px;
  }
`;
const SubCatForm = () => {
const [formInput, setFormInput] = useState({
  name: "",
  category: "",
});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
   e.preventDefault();
   const currentSubCatData =
     JSON.parse(localStorage.getItem("subCatData")) || [];
   const id = currentSubCatData.length + 1;
   currentSubCatData.push({
     id: id,
     ...formInput
   });
   localStorage.setItem("subCatData", JSON.stringify(currentSubCatData));
    window.location.reload();
}
const deleteSubCategory = (id) => {
  const updatedSubCategoryData = subCatData.filter(
    (subcategory) => subcategory.id !== id
  );
  setSubCategoryData(updatedSubCategoryData);
  localStorage.setItem("subCatData", JSON.stringify(updatedSubCategoryData));
};
const categoryData = JSON.parse(localStorage.getItem("categoryData")) || [];
    return (
      <div>
        <form action="" onSubmit={onSubmit}>

          <ModalTimelines
            name="category"
            className="form-select"
            onChange={handleChange}
            required
          >
            {categoryData ? (
              <>
                <option value="">Select Category</option>
                {categoryData.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </>
            ) : (
              <option value="">Loading...</option>
            )}
          </ModalTimelines>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" name="name" onChange={handleChange} required />
          <button className="save-data" type="submit">
            Save
          </button>
        </form>{" "}
      </div>
    );
}

export default SubCatForm

