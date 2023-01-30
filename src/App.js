import React from 'react'
import Login from "./Pages/Login";
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Registration from "./Pages/Registration";
import { useState } from 'react';
import Billings from './Pages/Billings';
import setAuthToken from './utilitis/setAuthToken';



export const UserContext = React.createContext('theme')

const token = localStorage.getItem("token")

if (token) {
  setAuthToken(token)
}

function App() {


  const [user, setUser] = useState((token && jwt_decode(token)) || {})


  return (
    <UserContext.Provider value={[user, setUser]}>

      <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/billings' element={<Billings />} />
          <Route path='/registration' element={<Registration />} />
        </Routes>
        <ToastContainer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
