import jwt from 'jsonwebtoken';

//Token Verification for admin pass the token as atoken in headers
//admin authentification middleware
const authAdmin = async (req, res, next) => {
    

  

    try {
        const {atoken} = req.headers;
        if(!atoken) {
            return res.status(401).json({ success: false, message: 'Not authorised Login Again' });
        }
        const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
        if(decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(403).json({ success: false, message: 'Not authorised Login Again' });
        }// Attach the decoded admin info to the request object
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(403).json({ success: false, message: 'Invalid token' });
    }
}

export default authAdmin;