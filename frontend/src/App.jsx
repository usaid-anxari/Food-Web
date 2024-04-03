import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart' 
import PlaceOrder from './pages/OrderPlace/PlaceOrder' 

const App = () => {
  return (
    <>
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/placeorder' element={<PlaceOrder />}/>
      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App