import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        res.status(401).send("Acess denid. No tkoen provided.");
        return 
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "secret-key") as {userId: number; role:string};
        console.log("Decoded token:", decoded);
        (req as any).user = {id: decoded.userId, role: decoded.role};;
        next();
    } catch (error) {
        if (error instanceof Error) {
            console.error("Invalid token:", error.message);
            res.status(400).send(error.message);
        } else {
            res.status(400).send("An unknown error occurred");
        }
    }
};

export const checkRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const user = (req as any).user;

        console.log("User from token:", user);
        console.log("Required roles:", roles);

        if (!user || !roles.includes(user.role)) {
            console.log("Access denied: insufficient permissions");
            res.status(403).send("Acces denied. insufficient permission");
            return 
        }

        next();
    }
}