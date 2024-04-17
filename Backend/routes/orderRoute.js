import {orderPlace} from '../controllers/orderController.js'
import authMiddleware from '../middleware/auth.js' 
import express from 'express';

const orderRoute = express.Router()

orderRoute.post('/place',authMiddleware,orderPlace)

export default orderRoute