
import jwt from 'jsonwebtoken';
import config from '../config.js';
function userMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;

    console.log(authHeader, "authHeader")

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({error: "no token provided"});
    }
    const token = authHeader.split(' ')[1];
    console.log(token, "token")
    console.log("config.JWT_USER_PASSWORD",config.JWT_USER_PASSWORD )

    try {
        const decoded = jwt.verify(token,config.JWT_USER_PASSWORD);
        console.log(decoded, "decoded")
      const num =  req.userId = decoded.id;
      console.log(num, "num")
        next();
    }catch(error){
        return res.status(401).json({error: "Not authorized, token Expired"});
        console.log("invalid token or token expired")
    }
    
}

export default userMiddleware