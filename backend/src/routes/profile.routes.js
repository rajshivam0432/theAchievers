import { Router } from "express";
// import { upload } from "../middlewares/multer.middlewares.js";
import { complaint} from "../controllers/profile.controllers.js";
import { Complaint } from "../models/complaint.model.js";
import { Apierror } from "../utils/apierror.js";
import jwt from 'jsonwebtoken';



const router=Router();




router.route('/complaint').post(complaint)   
router.route("/complaints").get(async (req, res) => {
  try {
    
    // Fetch complaints associated with the logged-in user
    const complaints = await Complaint.find({}).lean(); // Use lean() to convert to plain objects
    console.log("complaints",complaints)


    // Modify each complaint object to include useremail
   
    console.log("complaintsWithUserEmail",complaints)

    res.status(200).json({ data: complaints }); // Send response with modified complaints
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }})

export default router