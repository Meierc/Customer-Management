import express, { Request, Response, NextFunction } from "express";
import { Customer } from "../models/Customer";
import { verifyToken } from "../routes/authMiddleware";

const router = express.Router();

// Create new customer
router.post("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const latestCustomer = await Customer.findOne().sort({ intNr: -1 });

        // If no customer exists, start with "K-0001"
        let newIntNr = "K-0001";
        if (latestCustomer) {
            const lastNumber = parseInt(latestCustomer.intNr.split("-")[1]); // Get the last number
            newIntNr = `K-${String(lastNumber + 1).padStart(4, "0")}`; // Increment & format
        }

        const newCustomer = new Customer({
            intNr: newIntNr,
            type: req.body.type, // Must be "DEALER", "COMPANY" or "PRIVATE"
            addresses: req.body.addresses,
            contactPersons: req.body.contactPersons,
        });

        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (err) {
        console.error("Error creating customer:", err);
        res.status(500).json({
            message: "Error adding customer",
            error: err,
        });
    }
});

// Get all Customers
router.get(
    "/",
    verifyToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customers = await Customer.find();
            res.json(customers);
        } catch (err) {
            res.status(500).json({
                message: "An error occurred",
                error: err,
            });
        }
    }
);

// Get single Customer
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            res.status(404).json({ message: "Customer not found" });
        } else {
            res.json(customer);
        }
    } catch (err) {
        res.status(500).json({
            message: "An error occurred",
            error: err,
        });
    }
});

// Update Customer
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.body;

        if (type && !["DEALER", "COMPANY", "PRIVATE"].includes(type)) {
            res.status(400).json({
                message:
                    "Invalid customer type. Allowed are: DEALER, COMPANY, PRIVATE.",
            });
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedCustomer) {
            res.status(404).json({ message: "Customer not found" });
        } else {
            res.json(updatedCustomer);
        }
    } catch (err) {
        res.status(500).json({
            message: "An error occurred",
            error: err,
        });
    }
});

// Delete Customer
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await Customer.findByIdAndDelete(req.params.id);

        if (!result) {
            res.status(404).json({ message: "Customer not found" });
            return;
        }

        res.json({ message: "Customer successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting customer" });
    }
});

export default router;
