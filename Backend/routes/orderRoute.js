import {orderPlace, verifyOrder,userOrders,listOrders,updateStatus} from '../controllers/orderController.js'
import authMiddleware from '../middleware/auth.js' 
import express from 'express';

const orderRoute = express.Router()

orderRoute.post('/place',authMiddleware,orderPlace)
orderRoute.post('/verify',verifyOrder)
orderRoute.post('/userorders',authMiddleware,userOrders)
orderRoute.get('/listing',listOrders)
orderRoute.post('/status',updateStatus)

export default orderRoute