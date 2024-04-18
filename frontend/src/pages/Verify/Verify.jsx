import React from "react";
import "./Verify.css";
import { useStore } from "../../Context/StoreContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { url } = useStore();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();
  const paymentVerify = async () => {
    const response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });
    if (response.data.success) {
      toast.success(response.data.message);
      navigate("/myorder");
    } else {
      toast.error(response.data.message);
      navigate("/");
    }
  };

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
