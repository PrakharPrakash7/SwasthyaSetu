import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay';
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

const updateProfile = async (req, res) => {
    try {

        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !address || !dob || !gender) {
            return res.json({ success: false, message: 'Fill the missing details' })
        }
        const parsedAddress = JSON.parse(address);

        await userModel.findByIdAndUpdate(userId, { name, phone, address: parsedAddress, dob, gender })

        if (imageFile) {

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            const imageUrl = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, { image: imageUrl });

        }

        res.json({ success: true, message: "Profile updated successfully" });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        return res.json({ success: false, message: error.message });
    }

}

//api to book appointment

const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;

        const docData = await doctorModel.findById(docId).select('-password');

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor not available" });
        }

        let slots_booked = docData.slots_booked

        //checking slot availabilityte
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot not available" });
            }
            else {
                slots_booked[slotDate].push(slotTime);
            }
        }
        else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password');

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now(),
        };


        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();


        //save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment booked successfully" });
    } catch (error) {
        console.error("Error booking appointment:", error);
        return res.json({ success: false, message: error.message });
    }
};

// api to get user appointments for frontend my appointments page

const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body;

        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return res.json({ success: false, message: error.message });
    }
}


//API to cancel the appointment


const cancelAppointment = async (req,res) =>{

    try {
        const { userId , appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        //verify appointment user
        if(appointmentData.userId.toString() !== userId.toString()) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled : 'true'});

        //releasing the time from doctor slots

        const {docId , slotDate , slotTime} = appointmentData;

        const docData = await doctorModel.findById(docId);


            let slots_booked = docData.slots_booked;

            slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);

            await doctorModel.findByIdAndUpdate(appointmentData.docId, { slots_booked });


        res.json({ success: true, message: "Appointment cancelled successfully" });
    } catch (error) {
        console.error("Error cancelling appointment:", error);
        return res.json({ success: false, message: error.message });
    }
}

// doctors slots are not being changed



// api to make payment using razor pay

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {

    try {

        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment Cancelled or not found" });
        }

        // creating options for razorpay payment

        const options = {
            amount: appointmentData.amount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: `${appointmentId}`,
            payment_capture: 1
        };
        // creating a order
        const order = await razorpayInstance.orders.create(options);
        res.json({ success: true, order });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.json({ success: false, message: "Error creating payment" });

    }
}


// API to verify payment of razor pay

const verifyRazoPay = async (req, res) => {

       try {
    const { razorpay_order_id, razorpay_payment_id } = req.body;

    const orderinfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if(orderinfo.status === "paid") {

        await appointmentModel.findByIdAndUpdate(orderinfo.receipt, { payment: "true" });
        res.json({ success: true, message: "Payment  successfull"});
    }
    else{
        res.json({ success: false, message: "Payment Failed" });
    }

    } catch (error) {
        console.error("Error verifying payment:", error);
        res.json({ success: false, message: error.message });
    }
}







export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazoPay }
