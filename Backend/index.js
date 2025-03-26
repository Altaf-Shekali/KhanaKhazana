import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import kitchenRoute from "./route/kitchen.route.js";
import userRoute from "../Backend/route/user.route.js";
import razorpayRoute from "../Backend/route/razorpay.route.js";
import path from "path";
import { fileURLToPath } from 'url'; // Required for __dirname in ESM

// ESM does not support __dirname directly, so we recreate it
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// Connecting to MongoDB
try {
    mongoose.connect(URI);
    console.log("Connected to database");
} catch (error) {
    console.log("Error:", error);
}
  
//  routes
app.use("/kitchen",kitchenRoute);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use("/user",userRoute);
app.use("/v1",razorpayRoute);
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
