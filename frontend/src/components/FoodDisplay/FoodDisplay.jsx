import React from 'react'
import './FoodDisplay.css'
import { useStore } from '../../Context/StoreContext'
import FoodItems from '../FoodItems/FoodItems';


const FoodDisplay = () => {
    const { food_list } = useStore();
    console.log(food_list.description);
   return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {food_list.map((item,index)=>(
                <FoodItems key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
            ))}
        </div>
    </div>
  )
}

export default FoodDisplay