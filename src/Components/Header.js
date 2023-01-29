import React from 'react';

const Header = ({ total }) => {
    return (
        <div className='flex items-center justify-between p-8 bg-gray-100'>
            <div className='flex items-center gap-3'>
                <img width="30px" src="https://i.ibb.co/XzhVF9g/TEPCO-Power-Grid-symbol-svg-removebg-preview-1.png" alt="company_logo" />
                <h2 className='font-poppins uppercase font-bold'>Power-Hack</h2>

            </div>


            <p className='font-bold'>Total Paid : {total}</p>
        </div>
    );
};

export default Header;