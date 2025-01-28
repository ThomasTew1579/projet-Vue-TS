import { AppDataSource } from "../data-source";
import { User } from "../models/User";
import { validate } from "class-validator";

const userRepository = AppDataSource.getRepository(User);

export const addUser = async (user: Partial<User>): Promise<User | string[]> => {
    const newUser = userRepository.create(user);
    
    const errors = await validate(newUser);
    if(errors.length > 0) {
        return errors.map((err) => Object.values(err.constraints || {})).flat();
    }
    
    return await userRepository.save(newUser);
};

export const getUsers = async (): Promise<User[]> => {
    return await userRepository.find();
};

export const getUserById = async (id: number): Promise<User | null> => {
    console.log(id)
    return await userRepository.findOneBy({ id });
};

export const removeUser = async (id: number): Promise<boolean> => {
    const result = await userRepository.delete(id);
    return (result.affected ?? 0) > 0;
}



