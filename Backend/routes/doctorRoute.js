import express from 'express';
import { appointmentCancel, appointmentComplete, appointmentDoctor, doctorList, loginDoctor } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList);
doctorRouter.post('/login', loginDoctor);
doctorRouter.get('/appointments',authDoctor ,appointmentDoctor);
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel);
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete);

export default doctorRouter;