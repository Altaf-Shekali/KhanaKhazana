import express from "express";
import { razorpay, verifyPayment } from "../controller/razorpay.controller.js";

const router = express.Router();

router.post("/createorder", razorpay);
router.post("/verifypayment", verifyPayment); // ✅ New verification route

export default router;
