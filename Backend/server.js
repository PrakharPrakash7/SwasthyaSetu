import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
//app config

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();
// Connect to Cloudinary
connectCloudinary();
//middlewares

app.use(express.json())
app.use(cors());

//api routes


app.use('/api/admin',adminRouter);
//localhost:4000/api/admin/add-doctor

app.use('/api/doctor', doctorRouter);
//localhost:4000/api/doctor/list


app.get('/', (req, res) => {
  res.send('Api is running fine ');
});
//
//starting the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});