import {connectionSource} from "../database/data-source";
import {User_Entitled_Leave} from "../database/entity/entity";
import { User } from "../database/entity/user";


const entitledLeaveRepo = connectionSource.getRepository(User_Entitled_Leave);


export const createEntitledUserLeave = async (currentYear: number, user: User, numberOfDays: number) => {
    const userEntitled = entitledLeaveRepo.create({
        currentYear: new Date().getFullYear(),
        numberOfDays: numberOfDays,
        user: user,
        gradeLevel: user.gradeLevel
    });

    const entitled = await entitledLeaveRepo.save(userEntitled);

    return entitled;
};

export const getAllUserEntitledLeave = async () => {
    const entitled = await entitledLeaveRepo.find({
        relations: ['user']
    });
    return entitled;
}

export const getOneUserEntitledLeave = async (Id: string) => {
    const entitled = await entitledLeaveRepo.findOne({
        where: {id: Id},
        relations: ['user']
    });

    return entitled;
}

export const getOneByUser = async (user: User) => {
    const entitled = await entitledLeaveRepo.findOne({
       where: {userId: user.id},
       relations: ['user']
    });

    return  entitled;
}

export const updateEntitledUserLeave = async (Id: string,  updatedNumberOfDays?: number , gradedlevel?:number ,updatedYear?: number) => {
    const entitled = await entitledLeaveRepo.update(Id, {
        numberOfDays : updatedNumberOfDays,
        currentYear : updatedYear,
        gradeLevel: gradedlevel
    });
    return entitled;
};

export const delUserEntitledLeave = async (Id: string) => {
    const entitled = await entitledLeaveRepo.delete(Id);
    return entitled;
}