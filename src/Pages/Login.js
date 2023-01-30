// external import 
import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = (props) => {

    const navigate = useNavigate();


    const { register, formState: { errors }, handleSubmit, reset } = useForm();


    const onSubmit = async (data) => {
        console.log(data)
        axios.post(`http://localhost:5000/api/users/login`, { data })
            .then(res => {
                if (res.data.message) {
                    navigate('/billings');
                    toast.success('Welcome to Power-Hack');
                    reset();
                } else {
                    toast.warn('Sorry For This Issues Try again Later')
                }
            })
    };
    return (
        <div className='login'>
            <div className='flex items-center flex-col justify-center w-[430px] mx-auto p-10 border rounded-md mt-10'>
                <img width="50px" src="https://i.ibb.co/XzhVF9g/TEPCO-Power-Grid-symbol-svg-removebg-preview-1.png" alt="company_logo" />
                <h2 className='text-center font-bold'>Power-Hack</h2>
                <h2 className='text-center text-red-500 text-2xl'>Login</h2>


                <form onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <label class="label ">
                            <span className="text-lg">Email</span>
                        </label>
                        <input id='email' name="email" type="text" className="input w-[300px] max-w-xs rounded-sm border border-gray-300 focus:outline-none mt-2"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Email Required"
                                }
                            })}
                        />
                        <label class="label">
                            {errors?.email?.type === 'required' && <span class="label-text-alt text-red-400 font-bold">{errors?.email?.message}</span>}
                        </label>
                    </div>
                    <div>
                        <label class="label">
                            <span className="text-lg">Password</span>
                        </label>

                        <input id='password' name="password" type="password" className="input w-full max-w-xs rounded-sm border border-gray-300 focus:outline-none mt-2"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Password Required"
                                }
                            })}
                        />
                        <label class="label">
                            {errors?.password?.type === 'required' && <span class="label-text-alt text-red-400 font-bold">{errors?.password?.message}</span>}
                        </label>
                    </div>
                    <p className='text-center'>New to Power-Hack ?<Link className='text-decoration-none text-red-500' to="/registration"> Please Register</Link></p>
                    <input className='btn bg-red-800 border-none w-full mt-5 rounded-sm' type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
};
export default Login;