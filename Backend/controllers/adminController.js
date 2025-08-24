import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
// API for adding doctor

const addDoctor = async (req, res) => {

    try {
        const {name,email,password,speciality,degree,experience,about,fees,address,date} = req.body;
        const imageFile = req.file;
      // console.log({name,email,password,speciality,degree,experience,about,fees,address,date},imageFile);
      //checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address ) {
            return res.json({success: false, message: 'Please fill all the fields that are missing'});
        }

        //vaalidating email
        if(validator.isEmail(email) === false) {
            return res.json({success: false, message: 'Please enter a valid email'});
        }

        //validating strong password
        if(password.length < 6 ) {
            return res.json({success: false, message: 'Please enter a password greater than 6 characters'});
        }

        //hasing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        // UPLOAD IMAGE TO CLOUDINARY
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'});
        const imageUrl = imageUpload.secure_url;

        //saving data to database
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now(),
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();


        res.json({success: true, message: 'Doctor added successfully'});


    }
    catch (error) {
        console.error('Error adding doctor:', error);
        res.json({ success: false, message: error.message});
        return;
        
    }
}

// api for admin login
const loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;
        // console.log({email, password});
        // Check if email and password are provided
       
        // Check if the admin credentials match then send a token
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email+password , process.env.JWT_SECRET);

             res.json({success: true, token});
        } else {
            return res.json({success: false, message: 'Invalid email or password'});
        }
    } catch (error) {
        console.error('Error during admin login:', error);
        res.json({success: false, message: 'Internal server error'});
    }
}


//API to get all doctors for admin panel

const allDoctors = async (req, res) => {
    try {

        //remove password from the doctors for response
        const doctors = await doctorModel.find({}).select('-password');
        res.json({ success: true, doctors });
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.json({ success: false, message: error.message});
    }
};


// api to get all appointment list

const appointmentsAdmin = async (req,res) =>{

    try{

        const appointments = await appointmentModel.find({});

        res.json({ success: true, appointments });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.json({ success: false, message: error.message});
    }
}

// api for appointment cancellation

const appointmentCancel = async (req,res) =>{

    try {
        const {   appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        

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



export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin , appointmentCancel };