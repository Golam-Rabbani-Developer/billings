import React from 'react'
import Login from "./Pages/Login";
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Registration from "./Pages/Registration";
import { useState } from 'react';
import Billings from './Pages/Billings';



export const UserContext = React.createContext('theme')

function App() {

  const token = localStorage.getItem("token")

  const [user, setUser] = useState((token && jwt_decode(token)) || {})
  console.log(user)

  return (
    <UserContext.Provider value={[user, setUser]}>

      <div>
        <Routes>
          <Route path='/' element={<Billings />} />
          <Route path='/home' element={<Billings />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
        </Routes>
        <ToastContainer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
