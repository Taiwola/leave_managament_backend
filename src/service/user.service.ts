import { DeleteResult, UpdateResult } from 'typeorm';
import {connectionSource} from '../database/data-source';
import {User, UserStatus} from "../database/entity/user";
import {UserDetails} from "../interfaces/index";
import { Department } from '../database/entity/entity';

const userRepo = connectionSource.getRepository(User);


export const getUserEmail = async (email:string): Promise<User> => {
    const user = await userRepo.findOne({
        where: {email: email}
    });

    return user;
};

export const getOne = async (id: string):Promise<User> => {
    const user = await userRepo.findOne({
        where: {id: id},
        relations: ["directorOf", "staff"]
    });
    return user;
};

export const findAll =async () => {
    const user = await userRepo.find({
        relations: ["directorOf", "staff"]
    });
    return user;
}

export const createUser = async (data:UserDetails): Promise<User> => {
const create = userRepo.create({
    firstname: data.firstname,
    lastname: data.lastname,
    status: data.status,
    email: data.email,
    password: data.password,
});

    return await userRepo.save(create);

}

export const update = async (id: string, data: Partial<UserDetails>):Promise<UpdateResult> => {
    let user = await userRepo.update(id, {
        ...data
    });

    return user;
}

export const updateDept = async(id: string, dept: Department) => {
    const user = await userRepo.update(id, {
        staff: dept
    });

    return user;
}

export const del = async (id: string): Promise<DeleteResult> => {
        const deleteUser = await userRepo.delete(id);
        return deleteUser
}

export const updatePass = async (id: string, password:string):Promise<UpdateResult> => {
    const updatedUser = await userRepo.update(id, {
        password: password
    });

    return updatedUser;
}