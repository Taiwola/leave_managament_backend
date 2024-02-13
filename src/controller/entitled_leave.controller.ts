import {createEntitledLeave, getEntitledLeave, getOneEntitledLeave, deleteEntitledLeave} from "../service"
import {Request, Response} from "express";
import { validateUuid } from "./user.controller";




export const create_entitled_leave = async (req: Request, res: Response) => {
    const {gradeLevel, no_of_days} = req.body;

    if (!gradeLevel || !no_of_days) {
        return res.status(400).json({
            message: "missing field required"
        });
    };

    try {
        const entitled = await createEntitledLeave(+gradeLevel, +no_of_days)
        return res.status(201).json({
            message: "Request was successful",
            data: entitled
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

export const get_all_entitled = async (req: Request, res: Response) => {
    const entitled = await getEntitledLeave();

    res.status(200).json({
        message: "success",
        data: entitled
    })
}


export const get_one_entitled = async (req: Request, res: Response) => {
    const {Id} = req.params;

    const validId = validateUuid(Id);

    if (!validId) {
        return res.status(400).json({
            message: 'Invalid Id'
        })
    };

   try {
    const entitled = await getOneEntitledLeave(Id);

    if (!entitled) {
        return res.status(404).json({
            message: 'No Request found with this ID!'
            });
    };

    res.status(200).json({
        message:'Success',
        data: entitled
    })
   } catch (error) {
    console.log(error);
    return res.status(500).json({
        message:"internal server error"
    })
   }
}

export const delete_entitled_leave = async (req: Request, res: Response) => {
    const {Id} = req.params;

    const validId = validateUuid(Id);

    if (!validId) {
        return res.status(400).json({
            message: 'Invalid Id'
        })
    };

    try {
        const del = await deleteEntitledLeave(Id);
        return  res.status(200).json({
            message:"Delete Successful",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error"
        })
    }
}