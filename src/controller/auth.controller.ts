import {createUser, getUserEmail} from "../service"
import {Request, Response} from "express";
import * as bcrypt from "bcryptjs";
import { UserDetails, SignInDetails } from "../interfaces";
import { generateJwt } from "../config/jwt";
import { UserStatus } from "../database/entity/user";

export const registerUser = async (req: Request, res: Response) => {
    const {firstname, lastname, email, password}: UserDetails = req.body;
    const status = UserStatus.user
   
    const userExist = await getUserEmail(email);
    if (userExist) {
        return res.status(409).json({message: 'This email is already in use'});
    }
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser({
            firstname, lastname, email, password: hashPassword, status,
        });
        return res.status(201).json({
            message: 'New account created',
            data: newUser
        });
    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({
            message: 'Something went wrong while creating the account.'
        });
    }
   
}

export const signIn = async (req:Request, res:Response) => {
    const {email, password}: SignInDetails = req.body;
    const userExist = await getUserEmail(email);
    if (!userExist) {
        return res.status(404).json({message: "user not found"})
    };
    const pwd = userExist.password;
 
    const compPwd = await bcrypt.compare(password, pwd);
    if (!compPwd) {
        return res.status(400).json({message: "invalid credentials"});
    }

    const accessToken = await generateJwt(email, userExist.id);
    req.session.user_id = userExist.id;
    req.session.email = email;

    return res.status(200).json({
        message: "you have sucessfully logged in",
        accessToken,
        id: userExist.id
    })

}

export const logUserOut = async (req:Request, res:Response) => {
    if (req.session) {
        // delete the session object
        req.session.destroy((err)=> {
            if(err){
                console.log('error:'+ err);
                return res.status(400).json('unable to log out');
                }
                else{
                    res.clearCookie('connect.sid'); // 'connect.sid' is the default session cookie name
                    return res.status(200).json({message:'logging you out...'}) ;
                    }
                    });
    } else {
        return res.status(200).json({message:"logging you out...", });
    }
}