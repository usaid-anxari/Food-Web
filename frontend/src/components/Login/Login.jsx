import React, {  useState } from "react";
import "./Login.css";
import axios from 'axios'
import { assets } from "../../assets/assets";
import {useStore} from '../../Context/StoreContext'
import { toast } from "react-toastify";

const Login = ({ setLogin }) => {
  const {url,token,setToken} = useStore()
  const [currstate, setCurrstate] = useState("Sign up");
  const [data, setData] = useState({
    name:'',
    email:'',
    password:'',
  });

  // handler OnChange
  const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
  }
  // Login Hndler
  const onLogin = async (e)=>{
    e.preventDefault();
    let newUrl = url;
    if (currstate==='Login') {
        newUrl += '/api/user/login'
    }else{
      newUrl += '/api/user/register'
    }
    const response = await axios.post(newUrl,data)
    if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token',response.data.token)
        setLogin(false)
        toast.success('Welcome')
    }else{
      toast.error(response.data.message)
    }
  } 

  return (
    <div className="login">
      <form onSubmit={onLogin} className="login-container">
        <div className="login-title">
          <h2>{currstate}</h2>
          <img onClick={() => setLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-inputs">
          {currstate === "Login" ? (
            <></>
          ) : (
            <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" required />
          )}
          <input onChange={onChangeHandler} value={data.email} name="email"  type="email" placeholder="Enter Email" required />
          <input onChange={onChangeHandler} value={data.password} name="password" type="password" placeholder="Enter Password" required />
        </div>
        <button type="submit">{currstate === "Sign up" ? "Create account" : "Login"}</button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>By countinuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currstate === "Login" ? (
          <p>
            Create a new account? <span onClick={()=>setCurrstate('Sign up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={()=>setCurrstate('Login')}>login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
