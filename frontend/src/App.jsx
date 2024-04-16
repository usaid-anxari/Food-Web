import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart' 
import PlaceOrder from './pages/OrderPlace/PlaceOrder' 
import Login from './components/Login/Login'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'

const App = () => {
  const [login, setLogin] = useState(false)
  return (
    <>
    <ToastContainer />
    {login?<Login setLogin={setLogin}/>:<></>}
    <div className='app'>
      <Navbar  setLogin={setLogin}/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/order' element={<PlaceOrder />}/>
      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App