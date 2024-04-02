import { createContext, useContext } from "react";
import {food_list} from '../assets/assets'

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const contextValue = {
     food_list
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider

export const useStore = () => {
  return useContext(StoreContext)
}