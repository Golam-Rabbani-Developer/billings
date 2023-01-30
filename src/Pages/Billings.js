import React from 'react';
import { useState } from 'react';
import Billing from '../Components/Billing';
import Header from '../Components/Header';

const Billings = () => {
    const [totalBillings, setTotalBillings] = useState(0)
    return (
        <>
            <Header total={totalBillings}></Header>
            <div className='w-full md:w-[85%] mx-auto'>

                <Billing setTotalBillings={setTotalBillings} />
            </div>
            <div className='bg-gray-100 mt-16'>
                <p className='text-sm text-center p-4 '>All Rights Reserved By Power-Hack</p>
            </div>
        </>
    );
};

export default Billings;