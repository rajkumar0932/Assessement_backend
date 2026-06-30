import jwt from "jsonwebtoken";
import { User } from "../model/user.schema.js";
export const AuthMiddleware = async (req,res,next)=>{
    try{
        
        const AccessToken =req.cookies?.AccessToken || req.header("Authorization")?.replace("Bearer ", "") || req.body?.AccessToken;
         if(!AccessToken){
            return res.status(401).json({"message": "unauthorized user"});
        }
        const user = await jwt.verify(AccessToken,process.env.ACCESS_TOKEN_SECRET);
        if(!user){
              return res.status(401).json({"message": "unauthorized user"});

        }
       
        const userDetails = await User.findById(user.id);
        if(!userDetails){
              return res.status(401).json({"message": "user doesnot exist"});

        }
        req.user=userDetails;
        next();


    }
    catch(e){
        return res.status(401).json({"message": "something went wrong while authenticating "});

    }
          


}