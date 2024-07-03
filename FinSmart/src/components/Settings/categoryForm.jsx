import React, { useState,useEffect} from "react";
import axios from "axios";
import { baseUrl } from "../../utils";

const CategoryForm = ({ fetchCategory, toggleModal, category}) => {
  const [formInput, setFormInput] = useState({});
  useEffect(() => { if(category) setFormInput({
    categoryName: category.categoryName ||"",
  }) }, [category]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");

    if (category) {
      axios
        .put(`${baseUrl}/category/${category.categoryId}`, formInput, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          console.log("category updated:", response.data);
          fetchCategory();
        })
        .catch((error) => {
          console.error("Input Data again:", error);
        });
    } else {
      axios
        .post(`${baseUrl}/category`, formInput, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          console.log("category added:", response.data);
          fetchCategory();
        })
        .catch((error) => {
          console.error("Input Data again:", error);
        });
    }

    toggleModal("category");
  };


  return (
    <form className="category-form" onSubmit={onSubmit}>
      <label className="form-label">Name:</label>
      <input
        type="text"
        name="categoryName"
        className="expField"
        value={formInput.categoryName || ""}
        onChange={handleChange}
        required
      />
      <div className="popup-button">
        <button className="save-data" type="submit">
    
          Save
        </button>
        <button className="close-modal" onClick={() => toggleModal("category")}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
