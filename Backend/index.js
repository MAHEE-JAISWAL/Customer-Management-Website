import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({
    path: "./.env",
});

const app = express();
const port = 3000;
const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/Customer_data";

// Use cors middleware with specific origin
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only this origin to access the server
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions)); // Use cors with options
app.use(express.json());

// Import routes
import customerRouter from "./routes/customer.route.js";

// Use routes
app.use("/api/v1/customer", customerRouter);

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Server is connected at port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });
