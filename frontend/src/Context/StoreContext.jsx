import { createContext, useContext,  useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState({});
  const addToCart = (itemId) => {
    if (!cartItem[itemId]) {
      setCartItem((prv) => ({ ...prv, [itemId]: 1 }));
    } else {
      setCartItem((prv) => ({ ...prv, [itemId]: prv[itemId] + 1 }));
    }
  };
  const removeToCart = (itemId) => {
    setCartItem((prv) => ({ ...prv, [itemId]: prv[itemId] - 1 }));
  };
  const getTotalAmount = ()=>{
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item]>0) {
        let itemInfo = food_list.find((product)=> product._id===item);
        totalAmount += itemInfo.price * cartItem[item]
      }
    } 
    return totalAmount;
  }
  
  const contextValue = {
    food_list,
    addToCart,
    removeToCart,
    setCartItem,
    cartItem,
    getTotalAmount
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

export const useStore = () => {
  return useContext(StoreContext);
};
