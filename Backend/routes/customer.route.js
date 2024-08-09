// routes/customer.route.js
import express from "express";
import {
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getAllCustomers,
    getCustomer,
    getAvailableRooms
} from "../controllers/customer.controller.js";

const router = express.Router();

router.post("/addCustomer", addCustomer);
router.put("/updateCustomer/:id", updateCustomer);
router.delete("/deleteCustomer/:id", deleteCustomer);
router.get("/getAllCustomers", getAllCustomers);
router.get("/getCustomer/:id", getCustomer);
router.get("/availableRooms", getAvailableRooms); // New endpoint for available rooms

export default router;
