import { AppDataSource } from "./data-source";
import express from "express";
import authRoutes from "./routes/authRoutes";
// import userRoutes from "./routes/userRoutes";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import cors from "cors";





const app = express();
app.use(cors());

// display logs request to the server
app.use((req, res, next) => {
    console.log(`req.method:${req.method}, req.url:${req.url} `);
    next();
})

const PORT = 3000;

AppDataSource.initialize().then(() => {
        console.log("Database connected!");
        app.listen(PORT, () => {
            console.log(`Serveur running on http://localhost:${PORT}`);
        });
    }).catch((error) => {
        console.log("Database connection  failed:", error)
        process.exit(1);
    }
    );



const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User API",
            version: "1.0.0",
            description: "API for managing users",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: [path.join(__dirname, "./routes/*.ts")],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

console.log("Swagger is analyzing these files:", swaggerOptions.apis);

app.use("/api-docs", (req, res, next) => {
    console.log("Request to /api-docs");
    next();
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(express.json());

// Route to the app
// app.use("/api", userRoutes);
app.use("/auth", authRoutes);

