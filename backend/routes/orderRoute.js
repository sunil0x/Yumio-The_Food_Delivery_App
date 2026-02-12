// this file defines the API endpoints for order-related operations such as placing an order, verifying an order, fetching user orders and listing all orders for admin panel. It uses the orderController to handle the logic for each endpoint and authMiddleware to protect certain routes that require authentication.

import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, userOrders, verifyOrder , listOrders , updateStatus } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus)

export default orderRouter;