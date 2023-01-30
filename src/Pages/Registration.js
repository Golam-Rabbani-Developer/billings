
// external import 
import React, { useEffect } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

// internal import 
import { UserContext } from '../App';
import setAuthToken from '../utilitis/setAuthToken';


const Registration = (props) => {
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate();

    const { register, formState: { errors }, handleSubmit, reset } = useForm();


    useEffect(() => {
        if (user._id) {
            navigate('/billings');
            toast.success('Welcome to Power-Hack');
        }
    }, [user, navigate])


    const onSubmit = async (data) => {
        axios.post(`http://localhost:5000/api/users/registration`, { data })
            .then(res => {
                if (res.data.message) {
                    localStorage.setItem('token', res.data.token)
                    setUser(jwt_decode(res.data.token))
                    setAuthToken(res.data.token)
                    reset()
                } else {
                    toast.warn('Sorry For This Issues Try again Later')
                }
            })

    };
    return (
        <div className='registration'>
            <div className='flex items-center flex-col w-full  md:w-[40%] p-10 justify-center mx-auto border rounded-md mt-20'>
                <img width="50px" src="https://i.ibb.co/XzhVF9g/TEPCO-Power-Grid-symbol-svg-removebg-preview-1.png" alt="company_logo" />
                <h2 className='text-center font-bold'>Power-Hack</h2>
                <h2 className='text-center text-red-500 text-2xl'>Registration</h2>


                <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                    <div>
                        <label className="label">
                            <span className="text-lg">Name</span>
                        </label>

                        <input id='name' name="name" type="name" className="input w-full  rounded-sm border border-gray-300 focus:outline-none mt-2"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Name Required"
                                }
                            })}
                        />
                        <label className="label">
                            {errors?.name?.type === 'required' && <span className="label-text-alt text-red-400 font-bold">{errors?.name?.message}</span>}
                        </label>
                    </div>
                    <div>
                        <label className="label ">
                            <span className="text-lg">Email</span>
                        </label>
                        <input id='email' name="email" type="text" className="input w-full  rounded-sm border border-gray-300 focus:outline-none mt-2"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Email Required"
                                },
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                    message: "Email Should Be a Valid Email"
                                }
                            })}
                        />
                        <label className="label">
                            {errors?.email?.type === 'required' && <span className="label-text-alt text-red-400 font-bold">{errors?.email?.message}</span>}
                            {errors?.email?.type === 'pattern' && <span className="label-text-alt text-red-400 font-bold">{errors?.email?.message}</span>}
                        </label>
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-lg">Password</span>
                        </label>

                        <input id='password' name="password" type="password" className="input w-full rounded-sm border border-gray-300 focus:outline-none mt-2"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Password Required"
                                },
                                minLength: {
                                    value: 6,
                                    message: "Value Should Be Minimum 6 Digit"
                                }
                            })}
                        />
                        <label className="label">
                            {errors?.password?.type === 'required' && <span className="label-text-alt text-red-400 font-bold">{errors?.password?.message}</span>}
                            {errors?.password?.type === 'minLength' && <span className="label-text-alt text-red-400 font-bold">{errors?.password?.message}</span>}
                        </label>
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-lg">Phone</span>
                        </label>

                        <input id='phone' name="phone" type="phone" className="input w-full rounded-sm border border-gray-300 focus:outline-none mt-2"
                            {...register("phone", {
                                required: {
                                    value: true,
                                    message: "Phone Number Required"
                                },
                                minLength: {
                                    value: 11,
                                    message: "Value Should Be Minimum 11 Digit"
                                }
                            })}
                        />
                        <label className="label">
                            {errors?.phone?.type === 'required' && <span className="label-text-alt text-red-400 font-bold">{errors?.phone?.message}</span>}
                            {errors?.phone?.type === 'minLength' && <span className="label-text-alt text-red-400 font-bold">{errors?.phone?.message}</span>}
                        </label>
                    </div>

                    <p className='text-center'>Already Registered ?<Link className='text-decoration-none text-red-500' to="/login"> Please Login</Link></p>
                    <input className='btn bg-red-800 border-none w-full mt-5 rounded-sm' type="submit" value="Register" />
                </form>
            </div>
        </div>
    );
};
export default Registration;