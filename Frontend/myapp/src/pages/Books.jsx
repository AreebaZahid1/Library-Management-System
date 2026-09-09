import React, { useState, useEffect } from "react"; // useState stores the updated data & useEffect runs code automatically when page opens
// import axios from "axios"; // sends API request
import PageHeader from "../Components/Table";
import FormModal from "../Components/Form";
import "./Style/Books.css";
import api from "./Axios/api"; // Import the configured Axios instance

function Books() {

  // for getting category
  const [categories, setCategories] = useState([]);

  // for showing form
  const [showForm, setShowForm] = useState(false);

  // Store books
  const [books, setBooks] = useState([]);

  // Form data
  const [formData, setFormData] = useState({title: "",author: "",category: "",quantity: "",});

  // Store ID of the book being edited
  const [editId, setEditId] = useState(null);

  // Form fields
  const bookFields = [
    {
      label: "Book Name",
      name: "title",
      type: "text",
      placeholder: "Enter Book Name",
    },
    {
      label: "Author",
      name: "author",
      type: "text",
      placeholder: "Enter Author Name",
    },
    {
      label: "Category",
      name: "category",
      type: "select", //creating dropdown
      options: categories,
    },
    {
      label: "Quantity",
      name: "quantity",
      type: "number",
      placeholder: "Enter Quantity",
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // for fetching books data
  const getBooks = async () => {
    try
    {
      const response = await api.get("http://localhost:3000/api/books/get-books");

      setBooks(response.data.books);
    } 
    catch (error) 
    {
      console.log(error);
      alert("Error fetching books");
    }
  };

  // for fetching Category 
  const getCategories = async () => {
    try 
    {
      const response = await api.get("http://localhost:3000/api/categories/get-categories");

      setCategories(response.data.categories);
    } 
    catch (error) 
    {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
    getCategories();
  }, []);

  // Open Add Book form
  const handleAdd = () => {
  // Clear form data
  setFormData({title: "",author: "",category: "",quantity: "",});
  // Set form to Add mode
  setEditId(null);
  // Open form
  setShowForm(true);
};

  // Adding Book
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents the browser from refreshing the page when the form is submitted

    try 
    {
      const response = await api.post("http://localhost:3000/api/books/add-book",formData);

      alert(response.data.message);

      getBooks();
      setShowForm(false);

      setFormData({title: "",author: "",category: "",quantity: "",});
    } 
    catch (error) 
    {
      console.log(error);
      alert(error.response?.data?.message || "Error adding book");
    }
  };

// Delete Book
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");

    if (!confirmDelete) return;

    try 
    {
      const response = await api.delete(`http://localhost:3000/api/books/delete-book/${id}`);

      alert(response.data.message);
      getBooks();
    } 
    catch (error) 
    {
      console.log(error);
      alert(error.response?.data?.message || "Error deleting book");
    }
  };

  // Update book

  // Open Update Book form
  const handleEdit = (book) => {
  // Put the existing book data into the form
  setFormData({title: book.title,author: book.author,quantity: book.quantity,});
  // Store the ID of the selected book
  setEditId(book._id);
  // Open the form
  setShowForm(true);
};

// Update Book
  const handleUpdateBook = async (e) => {
  e.preventDefault();

try 
{
  const response = await api.put(`http://localhost:3000/api/books/update-book/${editId}`,formData);

  alert(response.data.message);

  // Refresh books
  getBooks();
  // Close form
  setShowForm(false);
  // Clear form
  setFormData({title: "", author: "", quantity: "",});
  // Clear edit ID
  setEditId(null);
  } 
   catch (error) 
   {
  console.log(error);
  alert(error.response?.data?.message ||"Error updating books");
   }
};
  
  // Close form and clear data
  const handleClose = () => {
  setShowForm(false);
  setFormData({title: "", author: "", quantity: "",});
  setEditId(null);
};

  return (
    <div className="books-page">
      <h1 className="books-heading">📚 Books</h1>

      <table className="books-table">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Author</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="5" className="books-td">
                No books found.
              </td>
            </tr>
          ) : (
            // for displaying books
            books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category?.name || book.category}</td>
                <td>{book.quantity}</td>

                <td>
                  <button className="edit-btn" onClick={() => handleEdit(book)}>Edit</button>

                  <button className="delete-btn" onClick={() => handleDelete(book._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="add-book-btn">
        <PageHeader buttonText="+ Add Book" onClick={() => setShowForm(true)}/>
      </div>

      {/* Form for both adding and updating Book */}
      {showForm && 
      ( 
      <FormModal title={ editId ? "Update Book" : "Add Book" } 
      fields={bookFields} 
      formData={formData} 
      handleChange={handleChange} 
      onClose={handleClose} 
      onSubmit={ editId ? handleUpdateBook : handleSubmit } 
      submitText={ editId ? "Update Book" : "Add Book" } 
      /> 
      )} 
      </div>
  );
}

export default Books;