import {Request, Response} from "express";
import {findAll, getOne, update, del, getUserEmail, updatePass, findOne_dept, updateDept} from "../service";
import {validate as uuidValidate} from "uuid";
import { UserDetails } from "../interfaces";
import * as bcrypt from "bcryptjs";
import {UserStatus} from "../database/entity/user"


export const validateUuid = (Id:string) => {
  const isValid = uuidValidate(Id);
   
     return isValid;
}


export const getAll = async (req: Request, res: Response) => {
 const users = await findAll();
 return res.status(200).json(users);
}

export const findOne = async (req: Request, res: Response) => {
    const Id = req.params.Id;
    if(!req.params?.Id){
        return res.status(400).json({
          message: "No id provided"
        })
      }

      const validUuid = validateUuid(Id);
      if (!validUuid){
        return res.status(400).json({message:"Invalid Id"});
    }
    
    try{
    const user = await getOne(Id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({data: user});
  }catch(err){
    console.log(err);
    return res.status(500).json({
        message:"Error while fetching the data"
    });
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const {Id} = req.params;
  const validUuid = validateUuid(Id);
  if (!validUuid){
    return res.status(400).send({error:"Invalid Id"});
}
  const {firstname, lastname, email, status, gradeLevel}:Partial<UserDetails> = req.body;

  const enumValues = Object.values(UserStatus);

  if (status) {
    if (!enumValues.includes(status)) {
      console.log("here")
        return res.status(406).json({ message: "not a valid enum type" });
    }
  }
 


  try {
    const user: Partial<UserDetails> = {
      firstname,
      lastname,
      email,
      status,
      gradeLevel
    };
    const updatedUser = await update(Id, user);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
      }
      console.log(updatedUser);
    return res.status(201).json({message: 'user updated', data: updatedUser});
  } catch (error) {
    console.log('update error', error);
    return res.status(500).json({
      message:"Error while updating the data",
    });
  }
}


export const deleteUser = async (req: Request, res: Response) => {
  const {Id} = req.params;
  const validUuid = validateUuid(Id);
  if (!validUuid){
    return res.status(400).send({error:"Invalid Id"});
}
try {
  const deletedUser = await del(Id);
  if (!deletedUser) {
    return res.status(404).json({ message: 'User not found' });
    }
  return res.status(200).json({message: 'user deleted', data: deletedUser});
} catch (error) {
  console.log("delete user error: ", error);
  return res.status(500).json({
    message:"Error while deleting the data",
  });
}
}


export const updatePassword = async (req: Request, res: Response) => {
  const {password} = req.body;
  if (!password) {
    return res.status(400).json({message: "Password is required"});
  }
  const {id} = req.params;
  const validUuid = validateUuid(id);
  if(!validUuid){
    return res.status(400).send({error:"Invalid Id"})
  }
  let hashedPassword;
  try{
    hashedPassword= await bcrypt.hash(password, 10);
    const updatePassword = await updatePass(id, hashedPassword);

    if (!updatePassword) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = await getOne(id);
    return res.status(200).json({
      message: "password updated",
      user
    })
  }catch(err){
    return res.status(500).json({message:'Internal server error'})
  }
}

export const updateDeptm = async (req: Request, res: Response) => {
  const {deptId} = req.body;
  const {Id} = req.params;

  if (!deptId) {
    return res.status(400).json({
      message: "input field missing"
    });
  };


  const validId = uuidValidate(Id);
  if (!validId) {
    return res.status(400).json({message:"Invalid Id"})
  };

  try {
     // find department
  const dept = await findOne_dept(deptId);

  if (!dept) {
    return res.status(400).json({message:"request does not exist"})
  }

  const updateUserDept = await updateDept(Id, dept);
 
  return res.status(200).json({
    message: "Request successful"
  })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error"
    })
  }
}