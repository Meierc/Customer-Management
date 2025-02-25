import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, maxlength: 50 },
        lastName: { type: String, required: true, maxlength: 50 },
        email: { type: String, required: true, unique: true, maxlength: 50 },
        passwordHash: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);
