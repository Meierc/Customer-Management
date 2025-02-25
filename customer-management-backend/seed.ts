import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI: string = process.env.MONGO_URI?.toString() || "";
if (!MONGO_URI) {
    throw new Error("⚠️ MONGO_URI is not defined!");
}

async function seedDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB connected!");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("test123", salt);

        const user = new User({
            firstName: "Chris",
            lastName: "Meier",
            email: "chris@example.com",
            passwordHash: hashedPassword,
        });

        await user.save();
        console.log("✅ Test-User saved!");
    } catch (err) {
        console.error("❌ Error during Seeding:", err);
    } finally {
        await mongoose.connection.close();
        console.log("🔌 Connection closed.");
    }
}

seedDB();
