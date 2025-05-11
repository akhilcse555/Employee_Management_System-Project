import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';


const ChangePassword = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit } = useForm();
  
    const { email, oldPassword } = location.state || {};
  
    const onSubmit = async ({ newPassword, confirmPassword }) => {
  
      if (newPassword !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      console.log(oldPassword);
    try {
        await axios.post('http://localhost:8000/ems_adminchangepassword/change-password', {
          email,
          oldPassword,
          newPassword,
        });
        alert('Password updated. Please log in.');
        navigate('/login');
      } catch (err) {
        alert(err.response?.data?.message || 'Error updating password');
      }
  };

  return (
    <div className="max-w-md mx-auto p-4 border shadow rounded-xl mt-10">
      <h2 className="text-2xl font-semibold mb-4">Change Password</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="password"
          placeholder="New Password"
          {...register('newPassword', { required: true })}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          {...register('confirmPassword', { required: true })}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
