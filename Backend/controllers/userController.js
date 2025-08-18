import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
//API to register user

const registerUser = async (req, res) => {
    
    try {
        const { name, email, password } = req.body;

        if(!name || !password || ! email ) {

            return res.json({success : false , message: "All fields are required"});
        }
        // validating email
        if(!validator.isEmail(email)) {
            return res.json({success : false , message: "Invalid email format"});
        }

        //validating password
        if(password.length < 6) {
            return res.json({success : false , message: "Password must be at least 6 characters long"});
        }

        //hashing password
        const salt  = await bcrypt.genSalt(10)
        const hashedPassword =  await bcrypt.hash(password,salt)

        const userData = {name, email, password: hashedPassword};

        const newUser = new userModel(userData)
        const user =  await newUser.save()

        // creating token
        const token = jwt.sign({id:user._id} , process.env.JWT_SECRET)

       return res.json({success : true , token});




    }
    catch(err){
        console.error("Error registering user:", err);
        return res.json({success : false , message: err.message});

    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.json({success: false, message: "All fields are required"});
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({success: false, message: "User not found"});
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({success: false, message: "Invalid credentials"});
        }

        // Create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return res.json({success: true, token});

    } catch (error) {
        console.error("Error logging in user:", error);
        return res.json({success: false, message: error.message});
    }
};


export {registerUser , loginUser}
