import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';
//API to register user

const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !password || !email) {

            return res.json({ success: false, message: "All fields are required" });
        }
        // validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format" });
        }

        //validating password
        if (password.length < 6) {
            return res.json({ success: false, message: "Password must be at least 6 characters long" });
        }

        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = { name, email, password: hashedPassword };

        const newUser = new userModel(userData)
        const user = await newUser.save()

        // creating token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        return res.json({ success: true, token });




    }
    catch (err) {
        console.error("Error registering user:", err);
        return res.json({ success: false, message: err.message });

    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return res.json({ success: true, token });

    } catch (error) {
        console.error("Error logging in user:", error);
        return res.json({ success: false, message: error.message });
    }
};

//api to get user profile data

const getProfile = async (req, res) => {

    try {

        const { userId } = req.body;

        const userData = await userModel.findById(userId).select('-password ');

        res.json({ success: true, userData });

    }
    catch (error) {
        console.error("Error logging in user:", error);
        return res.json({ success: false, message: error.message });
    }
}

// const updateProfile = async (req, res) => {
//     try {

//         const { userId, name, phone, address, dob, gender } = req.body;
//         const imageFile = req.file;

//         if (!name || !phone || !address || !dob || !gender) {
//             return res.json({ success: false, message: 'Fill the missing details' })
//         }

//         await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

//         if(imageFile) {

//             // upload image to cloudinary
//             const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'});
//             const imageUrl = imageUpload.secure_url;

//             await userModel.findByIdAndUpdate(userId, { image: imageUrl });

//         }

//         res.json({success:true, message: "Profile updated successfully"});
//     }
//     catch (error) {
//         console.error("Error logging in user:", error);
//         return res.json({ success: false, message: error.message });
//     }

// }
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: 'Fill the missing details' });
    }

    // ✅ handle both cases: stringified JSON or plain object
    let parsedAddress = address;
    if (typeof address === "string") {
      try {
        parsedAddress = JSON.parse(address);
      } catch (err) {
        return res.json({ success: false, message: "Invalid address JSON format" });
      }
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: parsedAddress,
      dob,
      gender
    });

    if (imageFile) {
      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: 'image'
      });
      await userModel.findByIdAndUpdate(userId, { image: imageUpload.secure_url });
    }

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.json({ success: false, message: error.message });
  }
};


export { registerUser, loginUser, getProfile, updateProfile  }
