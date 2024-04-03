import { createContext, useContext, useEffect, useState } from "react";
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

  useEffect(()=>{
   console.log(cartItem);
  },[cartItem])
  const contextValue = {
    food_list,
    addToCart,
    removeToCart,
    setCartItem,
    cartItem
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
