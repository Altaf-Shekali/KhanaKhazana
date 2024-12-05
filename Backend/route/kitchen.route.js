import express from "express";
import { getkitchen } from "../controller/kitchen.controller.js";

const router= express.Router();

router.get("/", getkitchen);

export default router;