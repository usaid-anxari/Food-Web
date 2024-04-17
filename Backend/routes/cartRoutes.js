import express from "express";
import {
  addToCart,
  fetchCartData,
  removeToCart,
} from "../controllers/cartControllers.js";
import authMiddleware from "../middleware/auth.js";

const cartRoute = express.Router();

cartRoute.post("/add", authMiddleware, addToCart);
cartRoute.post("/remove", authMiddleware, removeToCart);
cartRoute.post("/get", authMiddleware, fetchCartData);

export default cartRoute;
