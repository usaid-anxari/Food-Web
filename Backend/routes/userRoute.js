import express from 'express'
import {loginUser,createUser} from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/register',createUser)
userRouter.post('/login',loginUser)

export default userRouter;