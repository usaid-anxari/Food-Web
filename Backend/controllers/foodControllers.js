import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add Food Items
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    image: image_filename,
    price: req.body.price,
  })
  try {
    await food.save();
    res.json({success:true,message:'Food Added'})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:'Error'})
  }
};

// Food Item listing
const foodList = async (req,res)=>{
       try {
           const food = await foodModel.find({})
           res.json({success:true,data:food}) 
       } catch (error){
        res.json({success:false,message:'Internal Server Error'})
       }
}

// Remove Food Items
const removeFood = async (req,res)=>{
     try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:'Remove Item successfuly'})
     } catch (error) {
        res.json({success:false,message:'Internal Server Error'})
     }
}

export { addFood,foodList,removeFood };