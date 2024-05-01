import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const ListStudents = () => {
  const [students, setStudents] = useState([]);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editedStudent, setEditedStudent] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: ''
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://helpful-rejoicing-production.up.railway.app/students');
        if (response.status === 200) {
          setStudents(response.data);
        } else {
          console.error('Failed to fetch students');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleEdit = (id) => {
    setEditingStudentId(id);
    const studentToEdit = students.find(student => student.id === id);
    setEditedStudent(studentToEdit);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`https://helpful-rejoicing-production.up.railway.app/students/${editingStudentId}`, editedStudent);
      if (response.status === 200) {
        setEditingStudentId(null);
        console.log('Student edited successfully');
      } else {
        console.error('Failed to edit student');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://helpful-rejoicing-production.up.railway.app/students/${id}`);
      if (response.status === 204) {
        // Remove the deleted student from the state
        setStudents(students.filter(student => student.id !== id));
        console.log('Student deleted successfully');
      } else {
        console.error('Failed to delete student');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent({ ...editedStudent, [name]: value });
  };

  return (
    <div className="container">
      <h2>List of Students</h2>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{editingStudentId === student.id ? <input type="text" name="firstName" value={editedStudent.firstName} onChange={handleChange} className="form-control" /> : student.firstName}</td>
              <td>{editingStudentId === student.id ? <input type="text" name="lastName" value={editedStudent.lastName} onChange={handleChange} className="form-control" /> : student.lastName}</td>
              <td>{editingStudentId === student.id ? <input type="text" name="age" value={editedStudent.age} onChange={handleChange} className="form-control" /> : student.age}</td>
              <td>{editingStudentId === student.id ? <input type="text" name="email" value={editedStudent.email} onChange={handleChange} className="form-control" /> : student.email}</td>
              <td>
                {editingStudentId === student.id ? (
                  <button onClick={handleSave} className="btn btn-success mr-2">Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(student.id)} className="btn btn-primary mr-2">Edit</button>
                    <button onClick={() => handleDelete(student.id)} className="btn btn-danger">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListStudents;
