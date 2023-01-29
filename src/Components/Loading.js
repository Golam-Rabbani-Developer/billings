import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({ type, color }) => {
    return (
        <div style={{ width: "200px" }} className="d-flex justify-content-center align-items-center mx-auto">
            <ReactLoading type={type} color={color} height={150} width={100} />
        </div>
    );
};

export default Loading;
