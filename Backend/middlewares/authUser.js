import jwt from 'jsonwebtoken';

//Token Verification for admin pass the token as atoken in headers
//user authentification middleware
const authUser = async (req, res, next) => {
    

  

    try {
        const {token} = req.headers;
        if(!token) {
            return res.json({ success: false, message: 'Not authorised Login Again' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //geting id by decoding token
        if (!req.body) req.body = {};
        req.body.userId = decoded.id;  //adding userId to request body
        next()
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.json({ success: false, message: 'Invalid token' });
    }
}

export default authUser;