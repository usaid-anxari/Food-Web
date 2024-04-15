import multer from "multer";
import express from "express";
import { addFood,foodList,removeFood } from "../controllers/foodControllers.js";

const foodRouter = express.Router()

// Storage Engine
const storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>(
        cb(null,`${Date.now()},${file.originalname}`)
    )
})

// Upload Route
const upload = multer({storage:storage})

foodRouter.get('/list',foodList)
foodRouter.post('/add',upload.single('image'),addFood)
foodRouter.post('/remove',removeFood)

export default foodRouter;