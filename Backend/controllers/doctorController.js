    import doctorModel from "../models/doctorModel.js";
    import bcrypt from 'bcrypt'
    import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability =  async (req,res)=>{

    try{

        const {docId} = req.body;
        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available});
        res.json({success: true, message: 'Doctor availability changed successfully'});
    }
    catch(err){
        console.log(err)
        res.json({success: false, message: err.message})
    }
}

const doctorList = async (req,res) =>{

    try {
        const doctors = await doctorModel.find({}).select(['-password','-email']);
        res.json({ success: true, doctors });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }

}

//api for doctor login

const loginDoctor = async (req,res) =>{

    try{

        const {email,password} = req.body;
        const doctor = await doctorModel.findOne({ email });
        if (!doctor) {
            return res.json({ success: false, message: 'Doctor not found' });
        }
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET );

        res.json({ success: true, token });
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }

}

//api to get doctor appointments for doctor panel

const appointmentDoctor = async(req,res)=>{
    
    try{

        const {docId} = req.body;
        const appointments = await appointmentModel.find({ docId });
        res.json({ success: true, appointments });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}


// api to mark appointment as completed

const appointmentComplete = async (req,res) =>{
    try{

        const {docId, appointmentId} = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if(appointmentData && appointmentData.docId ===docId){
           await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            return res.json({ success: true, message: 'Appointment marked as completed' });
        }
        else{
            return res.json({ success: false, message: 'Appointment access denied' });
        }
    }
     catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }


}

//api to cancel appointment for doctor panel
const appointmentCancel = async (req,res) =>{
    try{

        const {docId, appointmentId} = req.body;
        const appointmentData = await  appointmentModel.findById(appointmentId);

        if(appointmentData && appointmentData.docId ===docId){
         await   appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            return res.json({ success: true, message: 'Appointment marked as cancelled' });
        }
        else{
            return res.json({ success: false, message: 'cancellation failed' });
        }
    }
     catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }


}


//api to get dashboard data from doctor panel

const doctorDashboard = async (req,res)=>{

    try{
        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId });

        let earnings = 0;

        appointments.map((item) => {

            if(item.isCompleted || item.payment) {
                earnings += item.amount;
            }
        });
        

        let patients = [];
        appointments.map((item)=>{

            if(!patients.includes(item.userId)){
                patients.push(item.userId);
            }
        })

        const dashData = {
            earnings ,
            appointments : appointments.length,
            patients : patients.length,
            latestAppointments : appointments.reverse().slice(0,5)
        }
        res.json({
            success: true,
            dashData
        });
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}


//api to get doctor profile for doctor panel

const doctorProfile = async (req,res) =>{

    try{
        const { docId } = req.body;
        const profile = await doctorModel.findById(docId).select(['-password']);
        if(profile){
            return res.json({ success: true, profile });
        }
        else{
            return res.json({ success: false, message: 'Doctor not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
    
}

//api to update doctor profile from doctor panel

const updateDoctorProfile = async (req,res) =>{
    try{

        const {docId ,fees, address, available} = req.body;
        await doctorModel.findByIdAndUpdate(docId,{fees, address, available});
        res.json({ success: true, message: 'Profile updated successfully' });
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }

}


export  {
    changeAvailability , doctorList ,loginDoctor, appointmentDoctor ,appointmentCancel , appointmentComplete,
    doctorDashboard ,doctorProfile, updateDoctorProfile,
}