import React from "react";
import "./PlaceOrder.css";
import { useStore } from "../../Context/StoreContext"; 
const PlaceOrder = () => {
  const { getTotalAmount } = useStore();
  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text"  placeholder="First name"/>
          <input type="text" placeholder="Last name" />
        </div>
        <input type="email" placeholder="Enter email"/>
        <input type="text" placeholder="Street"/>
        <div className="multi-fields">
          <input type="text"  placeholder="City"/>
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input type="text"  placeholder="Zip Code"/>
          <input type="text" placeholder="Country" />
        </div>
        <input type="number" placeholder="Phone"/>
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
            <p>${getTotalAmount()===0?0:2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <p>${getTotalAmount()===0?0:getTotalAmount()+2}</p>
          </div>
        <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
