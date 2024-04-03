import React from 'react'
import './FoodItems.css'
import { assets } from '../../assets/assets'
import { useStore } from '../../Context/StoreContext'

const FoodItems = ({name,id,price,description,image}) => {
  const {cartItem,addToCart,removeToCart} = useStore()
  return (
    <div className='food-item'>
        <div className='food-item-img-container'>
            <img className='food-item-img' src={image} alt="" />
            {
              !cartItem[id]
              ? <img className='add' onClick={()=> addToCart(id)} src={assets.add_icon_white}   /> 
              : <div className='food-item-counter' >
                <img onClick={()=> removeToCart(id)} src={assets.remove_icon_red} alt="" />
                <p>{cartItem[id]}</p>
                <img onClick={()=> addToCart(id)} src={assets.add_icon_green} alt="" />
              </div>
            }
        </div>
        <div className='food-item-info'>
            <div className='food-item-name-rating'>
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className='food-item-desc'>{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

export default FoodItems