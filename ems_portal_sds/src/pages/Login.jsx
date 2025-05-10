import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import Logo from '../components/Logo.jsx'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context_api/AuthContext.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'


function Login() {
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmitLogin = async (user_data) => {
            console.log(user_data);
            await axios.post("http://localhost:8000/ems_user/users", user_data)
            .then((res) =>  {
                login(res.data); // set token + user
                navigate("/");
                console.log(res.data);
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    // alert(err.response.data.message); // or use toast
                    toast.success(err.response.data.message,{position: "top-right"});
                  } else {
                    alert("Something went wrong");
                }
            })
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
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
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
                    >Sign in</Button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default Login