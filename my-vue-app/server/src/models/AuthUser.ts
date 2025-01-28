
export interface AuthUser {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
}

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, Length } from "class-validator";

@Entity()
export class AuthUser {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    @Length(2, 50, {message: "Name must be between 2 and 50 characters."})
    name!: string;

    @Column({ unique: true})
    username!: string;

    @Column()
    @IsEmail({}, {message: "Invalid email format."})
    email!: string;

    @Column()
    password!: string;

    @Column({ default: "user" })
    role!: string;
}
