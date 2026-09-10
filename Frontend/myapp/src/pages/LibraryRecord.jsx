import React, { useState, useEffect } from "react";
// import axios from "axios";
import PageHeader from "../Components/Table";
import FormModal from "../Components/Form";
import "./Style/LibraryRecord.css";
import api from "./Axios/api"; // Import the configured Axios instance

function LibraryRecord() {

  const [showForm, setShowForm] = useState(false);

  // Store library records
  const [records, setRecords] = useState([]);

  // Store books for dropdown
  const [books, setBooks] = useState([]);

  // Store users for dropdown
  const [users, setUsers] = useState([]);

  // Form Data
  const [formData, setFormData] = useState({book: "",user: "",issueDate: "",returnDate: "",isReturned: false});

  // for updating record through id
  const [editId,setEditId] = useState(null)

  // Form Fields
  const recordFields = [
    {
      label: "Book",
      name: "book",
      type: "select",
      options: books,
    },
    {
      label: "User",
      name: "user",
      type: "select",
      options: users,
    },
    {
      label: "Issue Date",
      name: "issueDate",
      type: "date",
    },
    {
      label: "Return Date",
      name: "returnDate",
      type: "date",
    },
    {
      label: "Is Returned",
      name: "isReturned",
      type: "checkbox",
    }
  ];

  // Handle Input Change
  const handleChange = (e) => {

  const { name, value, type, checked } = e.target;
  setFormData({
    ...formData,
    [name]: type === "checkbox" ? checked : value, // text k liye value aayi gi aur checkbox k liye checked
  });
};

  // Get Library Records
  const getRecords = async () => {
    try 
    {
      const response = await api.get("https://library-management-system-hdxd.vercel.app/api/library/get-records");
      setRecords(response.data.libraryRecords || []);

    } 
    catch(error) 
    {
      console.log(error);
      alert("Error fetching records");
    }
  };

  // Get Books for drop-down
  const getBooks = async () => {
    try 
    {
      const response = await api.get("https://library-management-system-hdxd.vercel.app/api/books/get-books");
      setBooks(response.data.books || []);
    } 
    catch(error) 
    {
      console.log(error);
    }
  };

  // Get Users (those who signin or register) for drop-down
  const getUsers = async () => {
    try 
    {
      const response = await api.get("https://library-management-system-hdxd.vercel.app/api/auth/getUsers");
      setUsers(response.data.users || []);
    } 
    catch(error) 
    {
      console.log(error);
    }
  };

  // Load Data
  useEffect(() => {

    getRecords();
    getBooks();
    getUsers();
  }, []);

  // Open Add Record Form
  const handleAdd = () => {
  // Clear form data
  setFormData({book: "",user: "",issueDate: "",returnDate: "", isReturned: false,});
  // Set form to Add mode
  setEditId(null);
  // Open form
  setShowForm(true);
};

  // Adding Record 
  const handleSubmit = async (e) => {

    e.preventDefault();
    try 
    {
      const response = await api.post("https://library-management-system-hdxd.vercel.app/api/library/add-record",formData);
      alert(response.data.message);
      getRecords();
      setShowForm(false);

      setFormData({book:"",user:"",issueDate:"",returnDate:"",isReturned:false});
    }
    catch(error) 
    {
      console.log(error);
      alert(error.response?.data?.message ||"Error adding record");
    }

  };

  // Delete Record
  const handleDelete = async(id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");

    if(!confirmDelete)
      return;
    try 
    {
      const response = await api.delete(`https://library-management-system-hdxd.vercel.app/api/library/delete-record/${id}`);

      alert(response.data.message);
      getRecords();
    }
    catch(error) 
    {
      console.log(error);
    }
  };

  // Update Record

   // Open Update Record form
  const handleEdit = (record) => {
  // Put the existing library record data into the form
  setFormData({book: record.book, user:record.user, issueDate: record.issueDate, returnDate: record.returnDate, isReturned:record.isReturned});
  // Store the ID of the selected library record
  setEditId(record._id);
  // Open the form
  setShowForm(true);
};
  
  // Update Record
  const handleUpdateRecord = async (e) => {
  e.preventDefault();

try 
{
  const response = await api.put(`https://library-management-system-hdxd.vercel.app/api/library/update-record/${editId}`,formData);

  alert(response.data.message);

  // Refresh records
  getRecords();
  // Close form
  setShowForm(false);
  // Clear form
  setFormData({book: "", user: "", issueDate: "", returnDate: "", isReturned: ""});
  // Clear edit ID
  setEditId(null);
  } 
   catch (error) 
   {
  console.log(error);
  alert(error.response?.data?.message ||"Error updating records");
   }
};
  
  // Close form and clear data
  const handleClose = () => {
  setShowForm(false);
  setFormData({book: "", user: "", issueDate: "", returnDate: "", isReturned: ""});
  setEditId(null);
};

  return (

    <div className="library-page">

      <h1 className="library-heading">
        📋 Library Records
      </h1>

      {
        records.length === 0 ? (

          <h3 className="no-records">
            No Records Found
          </h3>

        ) : (
          <table className="library-table">
            <thead>
              <tr>

                <th>Book</th>
                <th>User</th>
                <th>Issue Date</th>
                <th>Return Date</th>
                <th>Status</th>
                <th>Actions</th>

              </tr>
            </thead>

            <tbody>
            {
                records.map((record)=>(

                  <tr key={record._id}>

                    <td>
                    {record.book?.title || record.book}
                    </td>

                    <td>
                    {record.user?.name || record.user}
                    </td>

                    <td>
                    {new Date(record.issueDate).toLocaleDateString()}
                    </td>

                    <td>
                    {record.returnDate?new Date(record.returnDate).toLocaleDateString():"-"}
                    </td>

                    <td>
                    {record.isReturned ?"Returned":"Issued"}
                    </td>

                    <td>
                    <button className="edit-btn" onClick={() => handleEdit(record)}>Edit</button>
                    <button className="delete-btn"onClick={()=>handleDelete(record._id)}>Delete</button>
                    </td>

                  </tr>
                ))
              }

            </tbody>
          </table>
        )
      }

      <div className="add-record-btn">

        <PageHeader buttonText="+ Add Record" onClick={()=>setShowForm(true)} />

      </div>

       {/* Form for both adding and updating Book */}
      {showForm && 
      ( 
      <FormModal title={ editId ? "Update Record" : "Add Record" } 
      fields={recordFields} 
      formData={formData} 
      handleChange={handleChange} 
      onClose={handleClose} 
      onSubmit={ editId ? handleUpdateRecord : handleSubmit } 
      submitText={ editId ? "Update Record" : "Add Record" } 
      /> 
      )} 
    </div>

  );
}

export default LibraryRecord;