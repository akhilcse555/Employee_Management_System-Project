import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';
import { Editemployee } from './Editemployee';
import toast from 'react-hot-toast';

function Dashboard() {
    const [employees , setEmployees] = useState([]);

    useEffect( () => {
        const fetchEmployeeData = async() => {
            try {
                const response = await axios.get("http://localhost:8000/ems_employee/allemployees");
                setEmployees(response.data);
            } catch (error) {
                console.log("Error While Fetching the Data",error);
            }
        }
        fetchEmployeeData();
    },[])

    const handleDelete = async(id) => {
        try{
            const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
            if (!confirmDelete) return;
            await axios.delete(`http://localhost:8000/ems_employee/delete/employee/${id}`);
            setEmployees((prevEmployees) => prevEmployees.filter(emp => emp._id !== id));
            toast.success("Employee deleted successfully");
        }catch(error){
            console.log("error is ",error);
        }
    }

    return (
        <div className="bg-white min-h-screen py-10 px-4 md:px-6">
          {/* Add Button */}
          <div className="flex justify-start mb-6">
          <Link to="/Addemployee">
            <button
              link 
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Add New Employee
            </button>
          </Link>
          </div>
      
          {/* Table Container */}
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="hidden md:grid grid-cols-8 bg-green-600 text-white font-semibold">
              <div className="p-4 border">S.No.</div>
              <div className="p-4 border">Name</div>
              <div className="p-4 border">Mobile No.</div>
              <div className="p-4 border">Email</div>
              <div className="p-4 border">Department</div>
              <div className="p-4 border">Position</div>
              <div className="p-4 border">Address</div>
              <div className="p-4 border">Actions</div>
            </div>
      
            {/* Data Rows */}
            {employees.map((employee, index) => {
                return (
                    <div  
                    className="grid grid-cols-1 md:grid-cols-8 bg-white border md:border-0"
                  >
                  {/* Mobile labels */}
                  <div className="md:hidden p-2 font-semibold border-t border-b">S.No.</div>
                  <div className="p-4 border md:border break-words">{index+1}</div>
      
                  <div className="md:hidden p-2 font-semibold border-t border-b">Name</div>
                  <div className="p-4 border md:border break-words">{employee.name}</div>
      
                  <div className="md:hidden p-2 font-semibold border-t border-b">Mobile No.</div>
                  <div className="p-4 border md:border break-words">{employee.mobile}</div>
      
                  <div className="md:hidden p-2 font-semibold border-t border-b">Email</div>
                  <div className="p-4 border md:border break-words">{employee.email}</div>
      
                  <div className="md:hidden p-2 font-semibold border-t border-b">Department</div>
                  <div className="p-4 border md:border break-words">{employee.department}</div>
      
                  <div className="md:hidden p-2 font-semibold border-t border-b">Position</div>
                  <div className="p-4 border md:border break-words">{employee.position}</div>
      
                  <div className="md:hidden p-2 font-semibold border-t border-b">Address</div>
                  <div className="p-4 border md:border break-words">{employee.address}</div>
      
                  <div className="md:hidden p-2 font-semibold border-t border-b">Actions</div>
                  <div className="flex md:border p-4 gap-4">
                    <Link to={`/Editemployee/` + employee._id}>
                    <span className="text-blue-600 cursor-pointer">Edit</span>
                    </Link>
                    <span onClick={() => handleDelete(employee._id)} className="text-red-600 cursor-pointer">Delete</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
      
      
}

export default Dashboard
