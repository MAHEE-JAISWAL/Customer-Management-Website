import Customer from "../models/customer.model.js";
import mongoose from "mongoose";


// Existing functions...

// Get all available rooms
export const getAvailableeRooms = async (req, res) => {
    try {
        // Get all occupied rooms
        const occupiedRooms = await Customer.find({}).select('roomNo');
        const occupiedRoomNumbers = occupiedRooms.map(customer => customer.roomNo);

        // Get the list of all room numbers (1 to 50)
        const totalRooms = Array.from({ length: 50 }, (_, i) => i + 1);

        // Filter out occupied rooms to get the available rooms
        const availableRooms = totalRooms.filter(room => !occupiedRoomNumbers.includes(room));

        res.status(200).json({
            success: true,
            availableRooms
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};


// Add a new customer
export const addCustomer = async (req, res) => {
    try {
        const { name, phoneNo, aadharCardNo, gender, entryDate, leavingDate, roomNo } = req.body;

        // Check if the room is already occupied
        const existingCustomer = await Customer.findOne({ roomNo });
        if (existingCustomer) {
            const availableRooms = await Customer.find({}).select('roomNo');
            const occupiedRooms = availableRooms.map(customer => customer.roomNo);
            const emptyRooms = Array.from({ length: 50 }, (_, i) => i + 1).filter(room => !occupiedRooms.includes(room));

            return res.status(400).json({
                success: false,
                message: `Room ${roomNo} is already occupied`,
                availableRooms: emptyRooms
            });
        }

        // Check if phone number or Aadhar card number is already used
        const existingPhoneOrAadhar = await Customer.findOne({
            $or: [{ phoneNo }, { aadharCardNo }]
        });

        if (existingPhoneOrAadhar) {
            return res.status(400).json({
                success: false,
                message: "Customer with given phone number or Aadhar card number already exists"
            });
        }

        const customer = await Customer.create({ name, phoneNo, aadharCardNo, gender, entryDate, leavingDate, roomNo });

        res.status(201).json({
            success: true,
            message: "Customer added successfully",
            customer,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
// Update a customer
export const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Check if the ID is a valid MongoDB ObjectID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid customer ID",
            });
        }

        // Ensure that the room number is not already used by another customer
        if (updateData.roomNo) {
            const existingRoomCustomer = await Customer.findOne({
                roomNo: updateData.roomNo,
                _id: { $ne: id }, // Exclude the current customer
            });
            if (existingRoomCustomer) {
                return res.status(400).json({
                    success: false,
                    message: `Room ${updateData.roomNo} is already occupied`,
                });
            }
        }

        // Update the customer with the provided data
        const customer = await Customer.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            customer,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

// Delete a customer
export const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the ID is a valid MongoDB ObjectID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid customer ID",
            });
        }

        const customer = await Customer.findByIdAndDelete(id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Customer deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Get all customers
export const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();

        if (!customers || customers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No customers found",
            });
        }

        res.status(200).json({
            success: true,
            customers,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Get a single customer
export const getCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        res.status(200).json({
            success: true,
            customer,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Get all available rooms
export const getAvailableRooms = async (req, res) => {
    try {
        const availableRooms = await Customer.find({}).select('roomNo');
        const occupiedRooms = availableRooms.map(customer => customer.roomNo);
        const emptyRooms = Array.from({ length: 50 }, (_, i) => i + 1).filter(room => !occupiedRooms.includes(room));

        if (emptyRooms.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No available rooms found",
            });
        }

        res.status(200).json({
            success: true,
            availableRooms: emptyRooms
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
