import React, { useEffect, useState } from "react";
import "./MyOrder.css";
import { useStore } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";
import axios from "axios";

const userOrder = () => {
  const { url, token } = useStore();
  const [data, setData] = useState([]);
  // Fetching the Orders Data
  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
    console.log(response.data.data);
  };
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-order">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order,index)=>(
          <div key={index} className='my-orders-order'>
             <img src={assets.parcel_icon} alt="" />
             <p>{order.items.map((item,index)=>{
              if (index === order.items.length-1) {
                return item.name + ' X ' + item.quantity
              }else{
                return item.name + ' X ' + item.quantity + ', '
              }
             })}</p>
             <p>${order.amount}.00</p>
             <p>Items: {order.items.length}</p>
             <p><span>&#x25cf;</span> <b>{order.status}</b></p>
             <button onClick={fetchOrders}>Order Track</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default userOrder;
