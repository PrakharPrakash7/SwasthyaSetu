import express from 'express'
import { loginUser, registerUser } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser) // Assuming loginUser is defined in userController.js

export default userRouter
