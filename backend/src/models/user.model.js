import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema({
   fullName:{
    type:String,
    required:true,
    trim:true
   },
   email:{
    type:String,
    required:true,
    unique:true,
   },
   rollNumber:{
    type:String,
    required:true,
    unique:true,
    index:true
   },
   mobileNumber:{
    type:String,
    required:true,
    unique:true,
   },
   hostelNumber:{
    type:String,
    required:true,
   },
   roomNumber:{
    type:String,
    required:true,
   },
   password:{
    type:String,
    required:true,
   },
   account:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Account"
   },
   complaints:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Complaint"
   },
   refreshToken:{
    type:String
   }
},{timestamps:true})



userSchema.methods.generateAccessToken=function(){
    return  jwt.sign(
          {
              _id:this._id,
              email:this.email,
              rollNumber:this.rollNumber,
              mobileNumber:this.mobileNumber
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
              expiresIn:process.env.ACCESS_TOKEN_EXPIRY
          }
      )
  }
  userSchema.methods.generateRefreshTokens=function(){
      return  jwt.sign(
          {
              _id:this._id,
          },
          process.env.REFRESH_TOKEN_SECRET,
          {
              expiresIn:process.env.REFRESH_TOKEN_EXPIRY
          }
      )
  }

export const User=mongoose.model("User",userSchema)