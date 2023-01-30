import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../App';


const BillingModal = ({ billing, setBilling, refetch, editItem, setEditItem }) => {
    const [user, setUser] = useContext(UserContext)
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const config = `Bearer ${localStorage.getItem('token')}`

    const onSubmit = async (data) => {

        if (!editItem._id) {
            axios.post(`http://localhost:5000/api/add-billing`, { data })
                .then(res => {
                    if (res.data.billing) {
                        setBilling(res.data.billing)
                        console.log(res.data.billing)
                        toast.success('Data Added Successfully')
                        reset()
                        refetch()
                    } else {
                        toast.warn('Sorry For This Issues Try again Later')
                    }
                })
        }
        if (editItem._id) {
            axios.put(`http://localhost:5000/api/update-billing/${editItem._id}`, { data })
                .then(res => {
                    if (res.data.billing) {
                        toast.success('Data Updated Successfully')
                        reset()
                        refetch()
                        setBilling(res.data.billing)
                        setEditItem({})
                    }
                })
        }

    };

    return (
        <div>
            <input type="checkbox" id="billing-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="billing-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h2 className='font-bold text-2xl text-center'>{editItem._id ? 'You Are Updating' : 'Add Your Billings'}</h2>
                    {editItem._id && <p className='font-bold text-center text-sm'>Billing Id : <span className='text-green-400'>{editItem?._id}</span></p>}
                    <form className='w-full'>
                        <div>
                            <label className="label">
                                <span className="text-lg font-semibold">Full Name</span>
                            </label>

                            <input id='name' name="name" type="name" className="input w-full  rounded-sm border border-gray-300 focus:outline-none mt-2"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Name Required"
                                    }
                                })}
                                defaultValue={user?.name} />
                            <label className="label">
                                {errors?.name?.type === 'required' && <span className="label-text-alt text-red-400 font-bold">{errors?.name?.message}</span>}
                            </label>
                        </div>
                        <div>
                            <label className="label ">
                                <span className="text-lg font-semibold">Your Email</span>
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
                                defaultValue={user?.email} />
                            <label className="label">
                                {errors?.email?.type === 'required' && <span className="label-text-alt text-red-400 font-bold">{errors?.email?.message}</span>}
                                {errors?.email?.type === 'pattern' && <span className="label-text-alt text-red-400 font-bold">{errors?.email?.message}</span>}
                            </label>
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-lg font-semibold">Payable Amount</span>
                            </label>

                            <input id='amount' name="amount" type="amount" className="input w-full rounded-sm border border-gray-300 focus:outline-none mt-2"
                                {...register("amount", {
                                    required: {
                                        value: true,
                                        message: "amount Required"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors?.amount?.type === 'required' && <span className="label-text-alt text-red-400 font-bold">{errors?.amount?.message}</span>}
                            </label>
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-lg font-semibold">Phone Number</span>
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
                                defaultValue={user?.phone} />
                            <label className="label">
                                {errors?.phone?.type === 'required' && <span className="label-text-alt text-red-400 font-bold">{errors?.phone?.message}</span>}
                                {errors?.phone?.type === 'minLength' && <span className="label-text-alt text-red-400 font-bold">{errors?.phone?.message}</span>}
                            </label>
                        </div>
                        <div className="modal-action">
                            <label onClick={handleSubmit(onSubmit)} htmlFor="billing-modal" className="btn">Add</label>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default BillingModal;