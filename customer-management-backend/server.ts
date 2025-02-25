import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import customerRoutes from "./routes/customer";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Database connection
mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/auth", authRoutes);
app.use("/customers", customerRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("API is running!");
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
