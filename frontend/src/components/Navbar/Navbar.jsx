import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import {Link, useNavigate} from 'react-router-dom'
import {useStore} from '../../Context/StoreContext'

const Navbar = ({setLogin}) => {
  const [menu, setMenu] = useState("home");
  const {getTotalAmount,token,setToken} = useStore();
  const navigate = useNavigate();
  const logout =()=>{
    navigate('/')
    setToken('')
    localStorage.removeItem('token')
  }

  return (
    <div className="navbar">
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="nav-menu">
        <Link to='/' onClick={()=> setMenu('home')} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href="#explore-menu" onClick={()=> setMenu('menu')} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href="#app-download" onClick={()=> setMenu('mobile-app')} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a>
        <a href="#footer" onClick={()=> setMenu('contact')} className={menu === "contact" ? "active" : ""}>Contact</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="nav-search-icon">
           <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalAmount() === 0 ? '':"dot"}></div>
        </div>
        {!token?<button onClick={()=>setLogin(true)}>sign in</button>: 
        <div className="nav-profile">
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
        </div>   }
      </div>
    </div>
  );
};

export default Navbar;
