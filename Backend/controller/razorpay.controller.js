import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import User from "../model/user.model.js";
import mongoose from "mongoose";

dotenv.config();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

// 🟢 Create Order Function
export const razorpay = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({ success: false, message: "Amount is required" });
        }

        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: Date.now().toString(),
        };

        const order = await razorpayInstance.orders.create(options);

        res.status(200).json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        console.error("Razorpay Error:", error);
        res.status(500).json({ success: false, message: "Payment initialization failed", error: error.message });
    }
};
export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, plan } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId || !plan) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // ✅ Convert userId to ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid userId format" });
        }
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // ✅ Verify the payment signature
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }

        // ✅ Update User Plan in Database
        const planLimits = { basic: 30, silver: 35, gold: 40 };
        const updatedUser = await User.findByIdAndUpdate(
            userObjectId,
            { plan, remainingUses: planLimits[plan] },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Payment verified and plan updated successfully",
            order_id: razorpay_order_id,
            signature: razorpay_signature,
            user: updatedUser,
        });
    } catch (error) {
        console.error("Payment Verification Error:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};