import express from "express";
import { addUser, getUsers, getUserById, removeUser} from "../controllers/userController";
import { validateUser } from "../middleware/validateUser";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get("/users", authenticate, async (req, res) => {
    const user = await getUsers();
    res.json(user);
});


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: User not found.
 */
router.get("/users/:id", async (req, res) => {
    const user = await getUserById(Number(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).send("User not found");
    }
});


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - id
 *               - name
 *               - email
 *     responses:
 *       201:
 *         description: User added successfully.
 *       400:
 *         description: Validation errors.
 */
router.post("/users", validateUser, async (req, res) => {
    const user = req.body;
    const result = await addUser(user);

    if( Array.isArray(result)) {
        res.status(400).json({errors: result});
        return
    }
    res.status(201).send("User added");
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The user ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 */
router.put("/users/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { name, email} = req.body;

    const user = await getUserById(id);
    if(!user) {
        res.status(404).send("User not found");
        return;
    }

    if(name) user.name = name;
    if(email) user.email = email;


    await addUser(user);
    res.send("User updated")
})

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 */
router.delete("/users/:id", async (req, res) => {
    const success = await removeUser(Number(req.params.id));
    if(success) {
        res.send("User deleted");
    } else {
        res.status(404).send("User not found");
    }
});

export default router;