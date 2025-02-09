import { AppDataSource } from "../data-source";
import { AuthUser } from "../models/AuthUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(AuthUser);

export const signup = async (name: string, username: string, email: string, password: string, role: string): Promise<AuthUser | string> => {
    const existingUser = await userRepository.findOneBy({username});
    if(existingUser) {
        throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepository.create({name, username, email, password: hashedPassword, role});
    await userRepository.save(newUser);

    return "User registered successfully";
}

export const login = async (username: string, password: string): Promise<string> => {
    const user = await userRepository.findOneBy({username});
    if(!user) {
        throw new Error("Invalid credentials");
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign({userId: user.id, role: user.role}, "secret-key", { expiresIn: "1h"});
    return token;

}

export const getUsers = async (): Promise<AuthUser[]> => {
    return await userRepository.find();
};

export const getUserById = async (id: number): Promise<AuthUser | null> => {
    return await userRepository.findOneBy({ id });
};

export const removeUser = async (id: number): Promise<boolean> => {
    const result = await userRepository.delete(id);
    return (result.affected ?? 0) > 0;
}

export const updateUser = async (id: number , name: string, username: string, email: string, password: string, role: string): Promise<string> => {
    const user = await getUserById(id);
    if(!user) {
        throw new Error("User not found");
    }

    if(username) user.username = username;
    if(name) user.name = name;
    if(email) user.email = email;
    if(password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
    }
    if(role) user.role = role;

    const updatedUser = userRepository.create({id, name, username, email, password, role});
    const result = await userRepository.save(updatedUser);
    return "User registered successfully";
}
