import React, { useState, useEffect } from "react";
// import axios from "axios";
import PageHeader from "../Components/Table";
import FormModal from "../Components/Form";
import "./Style/Category.css";
import api from "./Axios/api";

function Category() {
  const [showForm, setShowForm] = useState(false);

  // Store category
  const [category, setCategory] = useState([]);

  // Form data
  const [formData, setFormData] = useState({name: "",});

  // Store the ID of the category being edited
const [editId, setEditId] = useState(null);

  const categoryFields = [
    {
      label: "Category Name",
      name: "name",
      type: "text",
      placeholder: "Enter Category Name",
    },
  ];

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fetch category
  const getCategory = async () => {
    try 
    {
      const response = await api.get("http://localhost:3000/api/categories/get-categories");

      setCategory(response.data.categories);
    } 
    catch (error) 
    {
      console.log(error);
      alert("Error fetching category");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

// Open Add Category form
   const handleAdd = () => {
// Clear old form data
   setFormData({name: "",});
// Make sure the form is in Add mode
   setEditId(null);
// Open the form
   setShowForm(true);
};

  // Add Category
  const handleSubmit = async (e) => {
    e.preventDefault();

    try 
    {
      const response = await api.post("http://localhost:3000/api/categories/add-category",formData);

      alert(response.data.message);

      getCategory();
      setShowForm(false);
      setFormData({ name: "" });
    } 
    catch (error) 
    {
      console.log(error);
      alert(error.response?.data?.message || "Error adding category");
    }
  };

  // Delete Category
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");

    if (!confirmDelete) return;

    try 
    {
      const response = await api.delete(`http://localhost:3000/api/categories/delete-category/${id}`);

      alert(response.data.message);

      getCategory();
    } 
    catch (error) 
    {
      console.log(error);
      alert(error.response?.data?.message || "Error deleting category");
    }
  };

// For Updating

// Open Update Category form
  const handleEdit = (cat) => {
// Put the existing category data into the form
  setFormData({name: cat.name,});
// Store the ID of the selected category
  setEditId(cat._id);
// Open the form
  setShowForm(true);
};

// Update Category
const handleUpdateCategory = async (e) => {
e.preventDefault();

try 
{
  const response = await api.put(`http://localhost:3000/api/categories/update-category/${editId}`,formData);

  alert(response.data.message);

  // Refresh categories
  getCategory();
  // Close form
  setShowForm(false);
  // Clear form
  setFormData({name: "",});
  // Clear edit ID
  setEditId(null);
  } 
   catch (error) 
{
  console.log(error);
  alert(error.response?.data?.message ||"Error updating category");
}
};
  
  // Close form and clear data
  const handleClose = () => {
  setShowForm(false);
  setFormData({name: "",});
  setEditId(null);
};

  return (
    <div className="category-page">
      <h1 className="category-heading">📂 Categories</h1>

      <div className="category-container">
        {category.length === 0 ? (
          <p className="no-category">No Categories Found</p>
        ) : (
          category.map((cat) => (
            <div key={cat._id} className="category-card">
              <h2 className="category-title">{cat.name}</h2>

              <p className="category-text">
                Books belonging to the {cat.name} category.
              </p>

              <button className="edit-btn" onClick={() => handleEdit(cat)}>Edit</button>

              <button className="delete-btn" onClick={() => handleDelete(cat._id)}>Delete</button>
            </div>
          ))
        )}
      </div>

      <div className="add-category-btn">
        <PageHeader buttonText="+ Add Category" onClick={() => setShowForm(true)}/>
      </div>

{/* Form for both adding and updating Category */}
      {showForm && 
      ( 
      <FormModal title={ editId ? "Update Category" : "Add Category" } 
      fields={categoryFields} 
      formData={formData} 
      handleChange={handleChange} 
      onClose={handleClose} 
      onSubmit={ editId ? handleUpdateCategory : handleSubmit } 
      submitText={ editId ? "Update Category" : "Add Category" } 
      /> 
      )} 
      </div>
  );
}

export default Category;