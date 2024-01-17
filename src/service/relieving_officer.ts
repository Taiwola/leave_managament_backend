import {connectionSource} from '../database/data-source';
import {Leave, Relieving_officer} from "../database/entity/entity";
import { User } from '../database/entity/user';
import { RelieveInterface } from '../interfaces';




const Relieving_officer_repo = connectionSource.getRepository(Relieving_officer);


export const createRequest = async (requestingUser: User, relieving_user: User, leave: Leave) => {
    const officer = Relieving_officer_repo.create({
        relieve_leave: leave,
        relieving_officer: relieving_user,
        requesting_officer: requestingUser
    });

    const relieve = await Relieving_officer_repo.save(officer);

    return relieve;
};


export const findRelievingOfficer = async (relievingUser: User) => {
    const relieving_officers = await Relieving_officer_repo.find({
        where: { relieving_officer: {id: relievingUser.id} }
    });

    return relieving_officers;
};




export const findAllRelieve = async () => {
    const relieve = await Relieving_officer_repo.find({
        relations: ['relieve_leave', 'relieving_officer', 'requesting_officer']
    });
    return relieve;
}


export const findOneRelieve = async (id: string) => {
        const relive = await Relieving_officer_repo.findOne({
            where: {id: id},
            relations: ['relieving_officer', 'relieve_leave', 'requesting_officer']
        })

        return relive;
}


export const updateRelieve = async (relieveData: Partial<RelieveInterface>, relieveId: string) => {

    const currentDate = new Date();

    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
      month: '2-digit',
      year: 'numeric', // Change this to '2-digit' if you want a 2-digit year
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(currentDate);
    
    const date = relieveData.accept_relieve === true ? formattedDate : null; 
    // Update the entity
    const updateResult = await Relieving_officer_repo
    .createQueryBuilder()
    .update() // Replace with your actual repository name
    .set({ 
        is_viewed: relieveData.is_viewed,
        accept_relieve: relieveData.accept_relieve,
        acceptance_date: date,
     }) // Specify the updated values
    .where("id = :id", { id: relieveId })
    .execute();

    // Check if any rows were affected
    if (updateResult.affected === 0) {
        throw new Error("No rows were updated. Check if the relieveId is valid.");
    }

    // Retrieve the updated entity
    const updatedRelieveOfficer = await Relieving_officer_repo.findOne({where: {id: relieveId}});
    console.log(updatedRelieveOfficer);

    return updatedRelieveOfficer;
};



export const deleteRelieve = async (id: string) => {
    const relieve_officer = await Relieving_officer_repo.delete(id);
    return relieve_officer;
}


