import "dotenv/config";
import cors from "cors";
import express from "express";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRoute from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoutes.js";
import orderRoute from "./routes/orderRoute.js";

// app config
const app = express();
const port = process.env.PORT || 3500;
console.log(port);


// middleware
app.use(express.json());
app.use(cors());

// MongoDb
connectDB();

// All api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use('/api/order',orderRoute)
// routes
app.get("/status", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`server start on http://localhost:${port}`);
});
