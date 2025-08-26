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
            appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
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
            appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
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


export  {
    changeAvailability , doctorList ,loginDoctor, appointmentDoctor ,appointmentCancel , appointmentComplete
}