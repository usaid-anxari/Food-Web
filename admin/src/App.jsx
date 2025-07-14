import React from "react";
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Order from "./Pages/Order/Order";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'

const App = () => {
  
  const url = import.meta.env.VITE_BASE_URL;
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url}/>} />
          <Route path="/list" element={<List url={url}/>} />
          <Route path="/orders" element={<Order url={url}/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
