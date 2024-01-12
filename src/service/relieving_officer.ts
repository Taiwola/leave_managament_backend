import {connectionSource} from '../database/data-source';
import {Leave, Relieving_officer} from "../database/entity/entity";
import { User } from '../database/entity/user';
import { RelieveInterface } from '../interfaces';




const Relieving_officer_repo = connectionSource.getRepository(Relieving_officer);


export const createRequest = async (requestingUser: User, relieving_user:User, leave: Leave) => {
    const relievingOfficer = new Relieving_officer();
    relievingOfficer.requesting_officer = requestingUser;
    relievingOfficer.relieving_officer = relieving_user;
    relievingOfficer.relieve_leave = leave;

    const officer = await Relieving_officer_repo.save(relievingOfficer);

    return officer;
};


export const findAllRelieve = async () => {
    const relieve = await Relieving_officer_repo.find({
        select: ['relieve_leave', 'relieving_officer', 'requesting_officer']
    });
    return relieve;
}


export const findOneRelieve = async (id: string) => {
        const relive = await Relieving_officer_repo.findOne({
            where: {id: id},
            select: ['relieving_officer', 'relieve_leave', 'requesting_officer']
        })

        return relive;
}


export const updateRelieve = async (relieveData: Partial<RelieveInterface> ,relieveId: string) => {
    const relieve_officer = await Relieving_officer_repo.update(relieveId, {
       ...relieveData
    });

    const updatedRelieveOfficer = await Relieving_officer_repo.findOne({
        where: {id: relieveId}
    });

    return updatedRelieveOfficer;
};

export const deleteRelieve = async (id: string) => {
    const relieve_officer = await Relieving_officer_repo.delete(id);
    return relieve_officer;
}


