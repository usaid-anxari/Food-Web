import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order for frontend
const orderPlace = async (req, res) => {
  const frontend_url = " http://localhost:5173/";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_item = req.body.items.map((item) => ({
      price_data: {
        currency: "dhs",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 50* 3.5,
      },
      quantity: item.quantity,
    }));

    line_item.push({
      price_data: {
        currency: "dhs",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 50* 3.5,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_item: line_item,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    res.json({success:true,session_url:session.url})
  } catch (error) {
    res.json({success:false,message:error})
  }
};

export { orderPlace };
