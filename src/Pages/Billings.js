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
        </>
    );
};

export default Billings;