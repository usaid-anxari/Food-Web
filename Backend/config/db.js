import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://projectrs:090078601@cluster0.qxv3ogj.mongodb.net/resturent').then(()=>(
        console.log('Connected to Database')
    ))
}   