import React from "react";
import "./Cart.css";
import { useStore } from "../../Context/StoreContext";
import {useNavigate} from 'react-router-dom'

const Cart = () => {
  const { cartItem, food_list, removeToCart,getTotalAmount } = useStore();
  const navigate = useNavigate()
  return (
    <div className="cart">
      <div className="cart-item">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-item-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>${item.price * cartItem[item._id]}</p>
                  <p onClick={() => removeToCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
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
        <button onClick={()=> navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
      <div className="promo-code">
        <div>
          <p>If you have promo code,enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Promo code"/>
            <button>Submit</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Cart;
