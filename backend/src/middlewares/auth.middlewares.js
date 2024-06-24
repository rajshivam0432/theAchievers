import { User } from "../models/user.model.js";
import { Apierror } from "../utils/apierror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


const verifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        const tokan=await req.cookies?.accessTokan || req.header("Authorization")?.replace("Bearer ","")
        if(!tokan){
            throw new Apierror(402,"unauthorized request")
        }
        const decodedToakn=jwt.verify(tokan,process.env.ACCESS_TOKEN_SECRET)
        const user=await User.findById(decodedToakn?._id).select("-password -refreshTokan")

        if(!user){
            throw new Apierror(401,"Invalid Access Tokan")
        }
        req.user=user;
         next();
    } catch (error) {
        throw new Apierror(401,error?.message || "Inavlid access tokan")
    }
})

export {verifyJWT}