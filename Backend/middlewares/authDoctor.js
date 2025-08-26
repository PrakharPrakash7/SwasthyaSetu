import jwt from 'jsonwebtoken';

//Token Verification for admin pass the token as atoken in headers
//Doctor authentification middleware
const authDoctor = async (req, res, next) => {

    try {
        const {dtoken} = req.headers;
        if(!dtoken) {
            return res.json({ success: false, message: 'Not authorised Login Again' });
        }
        const decoded = jwt.verify(dtoken, process.env.JWT_SECRET); //geting id by decoding token
        if (!req.body) req.body = {};
        req.body.docId = decoded.id;  //adding userId to request body
        next()
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.json({ success: false, message: 'Invalid token' });
    }
}

export default authDoctor;