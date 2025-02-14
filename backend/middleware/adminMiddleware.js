
import jwt from 'jsonwebtoken';
import config from '../config.js';
function adminMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;

    console.log(authHeader, "authHeader")

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({error: "no token provided"});
    }
    const token = authHeader.split(' ')[1];
    console.log(token, "token")
    console.log("config.JWT_ADMIN_PASSWORD",config.JWT_ADMIN_PASSWORD )

    try {
        const decoded = jwt.verify(token,config.JWT_ADMIN_PASSWORD);
        console.log(decoded, "decoded")
      const num =  req.adminId = decoded.id;
      console.log(num, "num")
        next();
    }catch(error){
        return res.status(401).json({error: "Not authorized, token Expired"});
        console.log("invalid token or token expired")
    }
    
}

export default adminMiddleware