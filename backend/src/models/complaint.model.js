import mongoose, { Schema } from "mongoose"

const complaintSchema=new Schema({
   category:{
    type:String,
    required:true
   },
   complaint:{
    type:String,
    required:true
   },
   
   complainter:{
    type:Schema.Types.ObjectId,
    ref:"User"
   },
   email: { type: String, required: true,unique:true},

   hostelNumber:{
    type:String,
    required:true,
   },

},{timestamps:true})

export const  Complaint=mongoose.model("Complaint",complaintSchema)
