import { Request, Response, NextFunction } from "express";


export const validateUser = (req: Request, res: Response, next: NextFunction): any => {
    const {id, name, email} = req.body;

    if(!id || typeof id !== "number") {
        return res.status(400).send("Invalide ID");
    }

    if(!id || typeof name !== "string") {
        return res.status(400).send("Invalide Name");
    }

    if(!id || typeof email !== "string" || !email.includes("@")) {
        return res.status(400).send("Invalide Email");
    }

    next();
}