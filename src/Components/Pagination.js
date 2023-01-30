import React, { useEffect } from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import axios from 'axios';
import { useState } from 'react';

const Pagination = ({ page, setPage }) => {
    const [length, setLength] = useState(0)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/billing-list?page=${page}`)
            .then(data => setLength(data?.data?.datalength))
    }, [page])

    return (
        <div className='flex items-center justify-center mt-10'>
            <span className='text-xl'><FaLongArrowAltLeft /></span>
            {
                [...Array(Math.ceil(parseInt(length) / 10)).keys()].map((number, index) =>
                    <button key={index} onClick={() => {
                        setPage(number)
                    }} className={`btn btn-sm rounded-none  mx-2 hover:text-white ${page === number ? "bg-red-700 text-white" : "bg-gray-200  text-gray-900"}`}>{number}</button>
                )
            }
            <span className='font-bold text-xl'><HiOutlineArrowNarrowRight /></span>
        </div>
    );
};

export default Pagination;