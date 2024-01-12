import {connectionSource} from '../database/data-source';
import {Department} from "../database/entity/entity";
import { User } from '../database/entity/user';


const departmentRepo = connectionSource.getRepository(Department);
const userRepository = connectionSource.getRepository(User);


export const create_dept = async (name: string) => {
    const dept = departmentRepo.create({
        name: name,
    });
    const saved = await departmentRepo.save(dept);
    return saved;
};

export const update_dept = async (id: string, user: User, name: string) => {
    const dept = await departmentRepo.update(id, {
        name: name,
        director: user,
    });

    return dept;
};

export const add_staff = async (id: string, user: User) => {
    const findDept = await findOne_dept(id);
  const addStaff = await userRepository.update(user.id, {
    staff:  findDept
  });
  return addStaff
}

export const remove_staff = async (user: User) => {
    const removeStaff = await userRepository.update(user.id, {
        staff: null
        })
    return removeStaff
}

export const findAll_dept = async () => {
    const dept = await departmentRepo.find({
        relations: ['staff', 'director']
    });
    return dept;
}

export const findOne_dept = async (id: string) => {
    const dept = await departmentRepo.findOne({
        where: {id: id},
        relations: ['staff', 'director']
    });
    return dept;
}

export const delete_dept = async (id: string) => {
    const dept = await departmentRepo.delete(id);
    return dept;
};