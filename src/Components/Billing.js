// exteranl import 
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { FaLongArrowAltLeft } from 'react-icons/fa'


// internal import 
import BillingModal from './BillingModal';
import Loading from './Loading';
import Pagination from './Pagination';

const Billing = ({ setTotalBillings }) => {
    const [billing, setBilling] = useState({})
    const [editItem, setEditItem] = useState({})
    const [searchtext, setSearchtext] = useState('')
    const [searchedBillings, setSearchBillings] = useState([])
    const [page, setPage] = useState(0)

    const { isLoading, error, data: billings, refetch } = useQuery('billings', () =>
        fetch(`http://localhost:5000/api/billing-list?page=${page}`).then(res =>
            res.json()
        ))


    if (billings?.total) {
        setTotalBillings(billings?.total)
    }


    const handleDelete = (item) => {
        axios.delete(`http://localhost:5000/api/delete-billing/${item._id}`)
            .then(res => {
                if (res.data.message) {
                    toast.success('Deleted Successfully')
                    refetch()
                }
            })
    }


    const handleSearch = (e) => {
        e.preventDefault()
        const newBillings = billings.billings.filter(billing => billing.name || billing.email || billing.phone.includes(searchtext))
        setSearchBillings(newBillings)
    }

    if (isLoading) {
        return <Loading color='red' type='spokes' />
    }
    if (error) {
        refetch();
    }

    return (
        <div className='mt-20'>
            <div className='flex items-center justify-between relative bg-gray-200 p-3 mb-4'>
                <div className='flex items-center gap-3'>
                    <p className='font-bold text-lg'>Billings</p>
                    <form onSubmit={(e) => handleSearch(e)}>
                        <input onKeyUp={(e) => setSearchtext(e.target.value)} className='input max-w-xs border-1 input-sm rounded-sm border-gray-300' type="text" name="" id="" />
                    </form>

                </div>
                <label onClick={() => {
                    setEditItem({})
                    setBilling({})
                }} htmlFor="billing-modal" className="btn absolute bottom-3 right-3 rounded-sm btn-sm">Add New</label>
                {
                    billing._id ? "" : <BillingModal editItem={editItem} refetch={refetch} billing={billing} setEditItem={setEditItem} setBilling={setBilling}></BillingModal>
                }

            </div>
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th>Billing Id</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Paid Amount</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            billings ? billings.billings?.map(billingItem =>
                                <tr key={billingItem._id ? billingItem._id : 'Generating Id'}>
                                    <th>{billingItem._id}</th>
                                    <td className='capitalize'>{billingItem.name}</td>
                                    <td>{billingItem.email}</td>
                                    <td>{billingItem.phone}</td>
                                    <td>{billingItem.amount}</td>
                                    <td className='cursor-pointer font-bold flex gap-1'>
                                        <label htmlFor="billing-modal" className="btn  rounded-sm btn-sm  bg-green-800 border-none" onClick={() => {
                                            setEditItem(billingItem)
                                            setBilling({})
                                        }}>Edit</label>

                                        <span onClick={() => handleDelete(billingItem)} className="btn  rounded-sm btn-sm bg-red-800 border-none">Delete</span></td>
                                </tr>)
                                : searchedBillings.map(billingItem =>
                                    <tr key={billingItem._id ? billingItem._id : 'Generating Id'}>
                                        <th>{billingItem._id}</th>
                                        <td className='capitalize'>{billingItem.name}</td>
                                        <td>{billingItem.email}</td>
                                        <td>{billingItem.phone}</td>
                                        <td>{billingItem.amount}</td>
                                        <td className='cursor-pointer font-bold flex gap-1'>
                                            <label htmlFor="billing-modal" className="btn  rounded-sm btn-sm  bg-green-800 border-none" onClick={() => {
                                                setEditItem(billingItem)
                                                setBilling({})
                                            }}>Edit</label>

                                            <span onClick={() => handleDelete(billingItem)} className="btn  rounded-sm btn-sm bg-red-800 border-none">Delete</span></td>
                                    </tr>

                                )

                        }

                    </tbody>
                </table>

                <Pagination page={page} setPage={setPage}></Pagination>
            </div>
        </div >
    );
};

export default Billing;