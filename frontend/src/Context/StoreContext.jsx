import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const url = "http://localhost:3500";
  const [token, setToken] = useState("");
  const [cartItem, setCartItem] = useState({});
  const [food_list, setFoodList] = useState([]);
  const fetchFoodList = async () => {
    const response = await axios.get(url+'/api/food/list');
    setFoodList(response.data.data)
  };
  useEffect(() => {
    async function loadData() {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
      await fetchFoodList();
    }
    loadData()
  }, []);

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
  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItem[item];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    addToCart,
    removeToCart,
    setCartItem,
    cartItem,
    getTotalAmount,
    url,
    token,
    setToken,
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
