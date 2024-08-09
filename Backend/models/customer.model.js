import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the customer's name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    phoneNo: {
        type: String,
        required: [true, "Please enter the customer's phone number"],
        unique: true,
    },
    aadharCardNo: {
        type: String,
        required: [true, "Please enter the customer's Aadhar card number"],
        unique: true,
    },
    gender: {
        type: String,
        required: [true, "Please select the customer's gender"],
    },
    entryDate: {
        type: Date,
        required: [true, "Please enter the entry date"],
    },
    leavingDate: {
        type: Date,
        required: [true, "Please enter the leaving date"],
    },
    roomNo: {
        type: Number,
        required: [true, "Please enter the room number"],
        unique: true,
        min: [1, "Room number must be between 1 and 50"],
        max: [50, "Room number must be between 1 and 50"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
