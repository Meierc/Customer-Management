import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();

// User Registration
router.post("/register", async (req: any, res: any) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already taken" });
        }

        const passwordHash = await bcrypt.hash(password, 10); // 🔥 Jetzt korrekt als passwordHash speichern
        const newUser = new User({ firstName, lastName, email, passwordHash });

        await newUser.save();
        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            message: "Server error during registration",
            error,
        });
    }
});

// User Login
router.post("/login", async (req: any, res: any) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );

        return res.json({ token, userId: user._id });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
});

export default router;
