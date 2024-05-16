import React, { useState, useEffect } from "react";

const CategoryForm = ({ category }) => {
  const [formInput, setFormInput] = useState({});

  useEffect(() => {
    if (category) {
      setFormInput({
        name: category.name || "",
        description: category.description || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentCategoryData =
      JSON.parse(localStorage.getItem("categoryData")) || [];

    if (category) {
      const updatedCategoryData = currentCategoryData.map((cat) =>
        cat.id === category.id ? { ...cat, ...formInput } : cat
      );
      localStorage.setItem("categoryData", JSON.stringify(updatedCategoryData));
    } else {
      const id = currentCategoryData.length + 1;
      currentCategoryData.push({
        id: id,
        ...formInput,
      });
      localStorage.setItem("categoryData", JSON.stringify(currentCategoryData));
    }

    window.location.reload();
  };

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <label htmlFor="name" className="form-label">
        Name:
      </label>
      <input
        type="text"
        name="name"
        value={formInput.name || ""}
        onChange={handleChange}
        required
      />
      {/* Add other form fields as needed */}
      <button className="save-data" type="submit">
        Save
      </button>
    </form>
  );
};

export default CategoryForm;
