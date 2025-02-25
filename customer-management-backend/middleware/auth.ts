import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "Kein Token vorhanden" });

    try {
        const decoded = jwt.verify(token, "supergeheimesToken"); // Nutze deinen Secret Key
        (req as any).user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: "Token ungültig" });
    }
};
