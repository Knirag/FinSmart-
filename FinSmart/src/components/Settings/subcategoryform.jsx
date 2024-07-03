import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../utils";
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

const SubCatForm = ({ toggleModal, fetchSubCat }) => {
  const [categories, setCategories] = useState([]);
  const [formInput, setFormInput] = useState({

  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

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

  const onSubmit = (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem("authToken");
    axios
      .post(`${baseUrl}/category/subcategory`, formInput, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log("Subcategory Added:", response.data);
        fetchSubCat();
      })
      .catch((error) => {
        console.error("Error adding subcategory:", error);
      });
      toggleModal("subcategory");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <ModalTimelines
          name="categoryId"
          value={formInput.categoryId}
          onChange={onChangeHandler}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </ModalTimelines>

        <label htmlFor="subCategoryName" className="form-label">
          Name
        </label>
        <input
          type="text"
          name="subCategoryName"
          className="expField"
          value={formInput.subCategoryName}
          onChange={onChangeHandler}
          required
        />
        <div className="popup-button">
          <button className="save-data" type="submit">
            Save
          </button>
          <button
            className="close-modal"
            onClick={() => toggleModal("subcategory")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubCatForm;
