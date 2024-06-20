import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import "./PlaceOrder.css";
import { useStore } from "../../Context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
const PlaceOrder = () => {
  const { getTotalAmount, token, food_list, cartItem, url } = useStore();
  const navigate = useNavigate()
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    zipcode: "",
    state: "",
    country: "",
    phone: "",
  });

  const handlerOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalAmount() + 2,
    };

    let response  =  await axios.post(url+'/api/order/place',orderData,{headers:{token}})
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url)
    }else{
      toast.error(response.data.message)
    }
  };

  useEffect(()=>{
    if (!token) {
      navigate('/cart')
      toast.error('Please Login First')
    }else if(getTotalAmount()===0){
        navigate('/')
        toast.error('Add to cart first')
    }
  },[token])
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            
            name="firstName"
            onChange={handlerOnChange}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            
            name="lastName"
            onChange={handlerOnChange}
            value={data.lastName}
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          
          name="email"
          onChange={handlerOnChange}
          value={data.email}
          type="email"
          placeholder="Enter email"
        />
        <input
          
          name="street"
          onChange={handlerOnChange}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            
            name="city"
            onChange={handlerOnChange}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            
            name="state"
            onChange={handlerOnChange}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            
            name="zipcode"
            onChange={handlerOnChange}
            value={data.zipcode}
            type="text"
            placeholder="Zip Code"
          />
          <input
            
            name="country"
            onChange={handlerOnChange}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          
          name="phone"
          onChange={handlerOnChange}
          value={data.phone}
          type="number"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivry Fee</p>
            <p>${getTotalAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <p>${getTotalAmount() === 0 ? 0 : getTotalAmount() + 2}</p>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
