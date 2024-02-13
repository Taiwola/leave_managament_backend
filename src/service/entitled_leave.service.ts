import { Entitled_Leave } from "../database/entity/entity";
import {connectionSource} from '../database/data-source';


const entitled_leave_Repo = connectionSource.getRepository(Entitled_Leave);


export const createEntitledLeave = async (gradeLevel: number, no_of_days: number) => {
        const entitled = entitled_leave_Repo.create({
            gradeLevel: gradeLevel,
            numberOfDays: no_of_days
        });

        const save = await entitled_leave_Repo.save(entitled);

        return save;
}

export const getEntitledLeave = async () => {
    const entitled = await entitled_leave_Repo.find();

    return entitled;
}

export const getEntitledLeaveByGradeLevel = async (level: number) => {
    const entitled = await entitled_leave_Repo.findOne({
        where: {gradeLevel: level}
    })
    return entitled;
}

export const getOneEntitledLeave = async (Id: string) => {
    const entitled = await entitled_leave_Repo.findOne({
        where: {id: Id}
    });
    return entitled;
};

export const updateEntitledLeave = async (Id: string, gradeLevel?: number, no_of_days?: number) => {
    const entitled = await entitled_leave_Repo.update(Id, {
        gradeLevel: gradeLevel,
        numberOfDays: no_of_days
    });

    return entitled;
}


export const deleteEntitledLeave = async (Id: string) => {
    const entitled = await entitled_leave_Repo.delete(Id);
}