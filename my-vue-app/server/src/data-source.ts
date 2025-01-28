import "reflect-metadata";
import { DataSource } from "typeorm";
import { AuthUser } from "./models/AuthUser";

export const AppDataSource = new DataSource ({
    type:"sqlite",
    database:"database.sqlite",
    synchronize:true,
    logging:true,
    entities:[AuthUser],
    migrations: [],
    subscribers: []
})

