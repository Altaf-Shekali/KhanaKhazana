import express from "express";
import { 
  addKitchen, 
  getKitchen, 
  kitchenLogin, 
  addMealTransaction, 
  getKitchenTransactions 
} from "../controller/kitchen.controller.js";

const router = express.Router();

// Existing routes
router.post("/signup", addKitchen);
router.post("/login", kitchenLogin);
router.get("/", getKitchen);

// New endpoints for meal transactions
router.post("/:kitchenId/transactions", addMealTransaction); // Record a transaction
router.get("/:kitchenId/transactions", getKitchenTransactions); // Fetch transactions

export default router;