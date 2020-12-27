import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const authenticate = async (req,res,next)=>{
    const authHeader = req.headers["authorization"];
    if(!authHeader) return res.status(401).json({error:"There is not a authHeader"})
    const token = authHeader.split(" ")[1];
    if(!token) return res.status(401).json({error:"Unauthorized access"});
    try{
        const payload = await jwt.verify(token,process.env.SECRET_KEY);
        next();
    }catch(err){
        res.status(401).json({error:"Unauthorized access"});
    }
}

export default authenticate;