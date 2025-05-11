import React, { useState } from 'react'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


function AdminSignup() {
    const {register, handleSubmit, formState: { errors },} = useForm();
    const navigate = useNavigate();
    
    const onSubmitSignup = async(adminRegistration_data) => {
        console.log(adminRegistration_data);
        await axios.post("http://localhost:8000/ems_adminsignup/signup",adminRegistration_data)
        .then((response) => {
                toast.success(response.data.message,{position: "top-right"});
                navigate("/login");
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <div
        className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-blue-300 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                        <h2 className='text-center text-3xl font-bold leading-tight'>
                            Admin Registeration Form
                        </h2>
            </div>
            {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
            {errors.mobile && (
                        <p className="text-red-500 text-sm">{errors.mobile.message}</p>
                    )}
            {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <form onSubmit={handleSubmit(onSubmitSignup)} className='mt-4'>
                <div className='space-y-3'>
                    <Input
                    label="Full Name: "
                    placeholder="Enter your full Name"
                    type="text"
                    {...register("name", {
                        required: true,
                          validate: {
                            matchPatern: (value) => /^[A-Za-z]+(?:\s[A-Za-z]+)+$/.test(value) ||
                            "Full name must include first and last name, separated by a space.",
                        },
                    })}
                    />
                    
                    <Input
                    label="Mobile Number: "
                    placeholder="Enter your Mobile Number"
                    type="tel"
                    {...register("mobile", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^[0-9]{10}$/.test(value) ||
                            "Enter a valid 10-digit mobile number",
                        }
                    })}
                    />
    
                    <Input
                    label="Email: "
                    placeholder="Enter your Email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                    />
      
                    <Button
                    type="submit"
                    className="w-full"
                    >Register</Button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default AdminSignup;