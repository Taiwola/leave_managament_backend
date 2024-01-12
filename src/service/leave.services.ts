import {connectionSource} from '../database/data-source';
import {Leave, Status, Approval_type} from "../database/entity/entity";
import { User } from '../database/entity/user';
import { LeaveDetails } from '../interfaces/leave.interfaces';

const leaveRepo = connectionSource.getRepository(Leave);

export const createLeave = async (data: LeaveDetails, user: User) => {
    const leave = leaveRepo.create({
        title: data.title,
        description: data.description,
        start_date: data.startDate,
        end_date: data.endDate,
        user: user,
        leave_type: data.leave_type,
        number_of_days: data.number_of_days,
        number_of_weeks: data.number_of_weeks
    });

    const created = await leaveRepo.save(leave);

    return created
};


export const getUserLeaves = async (user: User) => {
    const leave = await leaveRepo.find({
        where: {user: {id: user.id}},
        relations: ['user', 'user.staff']
    });
    return leave;
}

export const getAllPendingLeaves = async () => {
    
    const leaves = await leaveRepo.find({
        where: {status: Status.pending},
        relations: ['user', 'user.staff']
    });
    return leaves;
}


export const getOneLeave = async (id: string) => {

    const leave = await leaveRepo.findOne({
        where: {id},
        relations: ['user', 'user.staff']
    });

    return leave
    
};

export const getAllLeave = async () => {
    const leave = await leaveRepo.find({
        relations: ['user', 'user.staff'],
        order: {createdAt: 'desc'}
    });
    return leave;
};


export const deleteLeave = async (id: string) => {
    const deleted = await leaveRepo.delete({id});
    return deleted;
}

export const rejectOrApprove = async (id: string, status:Status ) => {
    const leave = await leaveRepo.update({id: id}, {
        status:status
    });

    return leave
};

export const addComment = async (id: string, comment: string) => {
    const leave = await leaveRepo.update({id: id}, {comment: comment});
    return leave;
}

export const department_approval = async (id: string) => {
    const dept = await leaveRepo.update(id, {
        departmental_approval: Approval_type.reviewed
    });
    return dept;
}

export const department_reject = async (id: string) => {
    const dept = await leaveRepo.update(id, {
        departmental_approval: Approval_type.rejected
    });

    return dept
};

export const operations_approval = async (id: string) => {
    const dept = await leaveRepo.update(id, {
        operation_management_approval: Approval_type.reviewed
    });
    return dept;
}

export const operations_reject = async (id: string) => {
    const dept = await leaveRepo.update(id, {
        operation_management_approval: Approval_type.rejected
    });

    return dept
}