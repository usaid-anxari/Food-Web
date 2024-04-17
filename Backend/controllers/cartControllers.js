import userModel from "../models/userModel.js";

// add to cart with user
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added To cart" });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};
// remove to cart with user
const removeToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId]) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed To cart" });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};
// listing cart data
const fetchCartData = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({success:true,cartData})
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

export { addToCart, removeToCart, fetchCartData };
