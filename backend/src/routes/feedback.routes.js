import express from "express";
import {Router} from "express"
import {submitFeedback,getFeedback} from "../controllers/feedback.controller.js";
const router=Router();
router.get("/get",getFeedback);
router.post("/create", submitFeedback);

export default router