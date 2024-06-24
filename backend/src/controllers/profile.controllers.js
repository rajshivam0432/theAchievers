import jwt from 'jsonwebtoken';
import { Apierror } from "../utils/apierror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Complaint } from "../models/complaint.model.js";

const complaint = asyncHandler(async (req, res) => {
  const { category, complaint } = req.body;

  // Validate input
  if (!category || !complaint) {
    throw new Apierror(400, "All fields are required");
  }

  // Verify and decode JWT token
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    throw new Apierror(401, "Unauthorized: Missing token");
  }
  console.log("token check",token)
  let decodedToken;
  try {
    decodedToken = jwt.verify(token,process.env.SECRET); 
    console.log("token checkkkk",decodedToken)
  } catch (error) {
    console.log(error)
    throw new Apierror(401, "Unauthorized: Invalid token");
  }

  // Extract user ID from decoded token
  const userId = decodedToken._id;
console.log("userid",userId)
  // Find the logged-in user
  const complainter = await User.findById(userId);
  console.log("complainter",complainter)

  
  if (!complainter) {
    throw new Apierror(404, "User not found");
  }
// const userhostel=await User.find({email:complainter.email})
// console.log("hosteluserrrrrrrrrrrrrrrrrr",userhostel)
  // Create a new complaint
  const createdComplaint = await Complaint.create({
    category,
    complaint,
    complainter: complainter._id,
    email:complainter.email,
    hostelNumber:complainter.hostelNumber
  });

  if (!createdComplaint) {
    throw new Apierror(500, "Failed to register the complaint");
  }

  // Log the successful creation
  console.log(`Complaint registered: ${createdComplaint._id}`);

  // Send response
  return res.status(201).json({
    status: "success",
    data: createdComplaint,
    email:complainter.email,
    message: "Your complaint registered successfully",
  });
});


export { complaint };
