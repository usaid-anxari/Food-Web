import React, { useEffect, useState } from "react";
import "./List.css";
import axios from 'axios'
import { toast } from "react-toastify";

const List = ({url}) => {
  const [list, setList] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if (response.data.success) {
      setList(response.data.data)
    }else{
      toast.error('errs')
    }
  };
  const removeItem = async (foodId)=>{
     const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
     await fetchData()
     if (response.data.success) {
        toast.success(response.data.message)
     }else{
      toast.error('Error')
     }
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className="list add flex-col">
      <p>All food Post</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Name</b>
          <b>Description</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>(
          <div key={index} className="list-table-format">
            <img src={`${url}/images/`+item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p className="cursor" onClick={()=> removeItem(item._id)}>X</p>
          </div>
        ))}
      </div>
    </div>
  )
};

export default List;
