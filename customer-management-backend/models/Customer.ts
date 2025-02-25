import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    intNr: { type: String, required: true, unique: true, maxLength: 10 },
    type: {
        type: String,
        enum: ["DEALER", "COMPANY", "PRIVATE"],
        required: true,
    },
    contactPersons: [
        {
            firstName: { type: String, maxLength: 50 },
            lastName: { type: String, maxLength: 50 },
            email: { type: String, maxLength: 50 },
            phone: { type: String, maxLength: 20 },
            birthDate: { type: String }, // Format YYYY-MM-DD
        },
    ],
    addresses: [
        {
            companyName: { type: String, maxLength: 50 },
            country: { type: String, maxLength: 50 },
            zip: { type: String, length: 5 },
            city: { type: String, maxLength: 50 },
            street: { type: String, maxLength: 100 },
            email: { type: String, maxLength: 50 },
            phone: { type: String, maxLength: 20 },
            fax: { type: String, maxLength: 20 },
        },
    ],
});

export const Customer = mongoose.model("Customer", CustomerSchema);
