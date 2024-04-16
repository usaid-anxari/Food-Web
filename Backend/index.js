import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRoute from "./routes/userRoute.js";
import 'dotenv/config'

// app config 
const app = express();
const port = 3500;

// middleware
app.use(express.json());
app.use(cors());

// MongoDb
connectDB();

// Food Route
app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads'))

// user Routes
app.use('/api/user',userRoute)
// routes
app.get('/',(req,res)=>{
  res.send('hello')
})

app.listen(port,()=>{
   console.log(`server start on http://localhost:${port}`);
})