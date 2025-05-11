import React, { useState } from 'react'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import Logo from '../components/Logo.jsx'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/authSlice.js'

function Login() {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const { loading, error, firstLogin, userId } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const onSubmitLogin = async (user_data) => {
            const result = await dispatch(loginUser(user_data));

            if (result.meta.requestStatus === 'fulfilled') {
                if (result.payload.firstLogin) {
                    // Pass email and temp password to change password page
                    navigate(`/change-password/${result.payload.userId}`, {
                        state: {
                            email: user_data.email,
                            oldPassword: user_data.password,
                        },
                    });
                } else {
                    navigate('/'); // Redirect to your protected dashboard
                }
            }
    };
          

    return (
        <div
        className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-blue-300 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                        <h2 className='text-center text-3xl font-bold leading-tight'>
                            <Logo width="100%" />
                        </h2>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit(onSubmitLogin)} className='mt-4'>
                <div className='space-y-3'>
                    <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true,
                    })}
                    />
                  <div className="flex justify-end mt-2">
                    <a href="/forgot-password" className="text-sm text-red-600 hover:underline">
                    Forgot Password?
                    </a>
                   </div>
                    <Button
                    type="submit"
                    className="w-full"
                    >{loading ? 'Logging in...' : 'Login'}</Button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default Login