export interface User {
    id: number;
    name: string;
    email: string;
}

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, Length } from "class-validator";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    @Length(2, 50, {message: "Name must be between 2 and 50 characters."})
    name!: string;

    @Column()
    @IsEmail({}, {message: "Invalid email format."})
    email!: string;
}