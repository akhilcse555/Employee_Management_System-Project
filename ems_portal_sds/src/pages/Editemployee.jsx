import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast"

function Editemployee() {
const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/ems_employee/employee/${id}`)
      .then((response) => {
        const empData = response.data;
        setEmployee(empData);
        reset({
          name: empData.name,
          mobile: empData.mobile,
          email: empData.email,
          department: empData.department,
          position: empData.position,
          address: empData.address,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, reset]);

  
  const onSubmit = async(employee_data) => {
    console.log("Submitted Data is :", employee_data);
    await axios.put(`http://localhost:8000/ems_employee/update/employee/${id}`,employee_data)
    .then((response) => {
        toast.success(response.data.message,{position: "top-right"});
        navigate("/");
    })
    .catch((error) => {
        console.log(error);
    })

    reset(); // reset the form after submission
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 md:px-10">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Update Employee data</h2>

      {employee && (<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            defaultValue={employee.name}
            placeholder="Enter full name"
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>


        <div>
          <label className="block font-medium mb-1">Mobile Number</label>
          <input
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit mobile number",
              },
            })}
            defaultValue={employee.mobile}
            type="tel"
            placeholder="9876543210"
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
        </div>


        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email address",
              },
            })}
            type="email"
            defaultValue={employee.email}
            placeholder="example@example.com"
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>


        <div>
          <label className="block font-medium mb-1">Department</label>
          <input
            {...register("department")}
            type="text"
            defaultValue={employee.department}
            placeholder="e.g. HR, Tech, Finance"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Position</label>
          <input
            {...register("position")}
            type="text"
            defaultValue={employee.position}
            placeholder="e.g. Manager, Developer"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Address</label>
          <textarea
            {...register("address")}
            placeholder="Enter address"
            defaultValue={employee.address}
            className="w-full border border-gray-300 p-2 rounded"
            rows="3"
          ></textarea>
        </div>

        <div>
        
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </form>)}
    </div>
  );
}

export default Editemployee;
