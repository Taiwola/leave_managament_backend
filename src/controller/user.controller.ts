import {Request, Response} from "express";
import {findAll, getOne, update, del, getUserEmail, updatePass} from "../service";
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
  const {firstname, lastname, email, status}:Partial<UserDetails> = req.body;

  const enumValues = Object.values(UserStatus);

  if (!enumValues.includes(status)) {
      return res.status(406).json({ message: "not a valid enum type" });
  }

  // const emailExist = await getUserEmail(email);

  // if (emailExist) {
  //   return res.status(409).json({message:'This Email already exist'})
  // }

  const user: Partial<UserDetails> = {
    firstname,
    lastname,
    email,
    status,
  };

  try {
    const updatedUser = await update(Id, user);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
      }
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