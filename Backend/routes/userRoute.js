import express from 'express'
import { getProfile, loginUser, registerUser, updateProfile } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'

import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser) // Assuming loginUser is defined in userController.js
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile',upload.single('image'), authUser,updateProfile) // Assuming updateProfile is defined in userController.js

export default userRouter
