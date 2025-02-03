import express, { Request, Response} from "express";
import { signup, login , getUsers, getUserById, removeUser} from "../controllers/authController";
import { authenticate, checkRole } from "../middleware/authMiddleware";


const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
    try {
        const {name, username, email, password, role} = req.body;
        const message = await signup(name, username, email, password, role);
        res.status(201).send(message);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.status(400).send("An unknown error occurred");
        }
    }
});

router.post("/login", async (req: Request, res: Response) => {
    try {
        const { username, password} = req.body;
        const token = await login(username, password);
        res.status(200).send(token);
    } catch (error ) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.status(400).send("An unknown error occurred");
        }
    }
});

router.get("/users", async (req, res) => {
    const user = await getUsers();
    res.json(user);
});

router.get("/users/:id", async (req, res) => {
    const user = await getUserById(Number(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).send("User not found");
    }
});

router.delete("/users/:id", authenticate, checkRole(["admin"]), async (req, res) => {
    const success = await removeUser(Number(req.params.id));
    if(success) {
        res.send("User deleted");
    } else {
        res.status(404).send("User not found");
    }
});

export default router;
