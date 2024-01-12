import {createRequest, updateRelieve, findAllRelieve, findOneRelieve, deleteRelieve, getOne, getOneLeave, findRelievingOfficer} from "../service";
import {validate as uuidValidate} from "uuid";
import {Request, Response} from 'express';
import {PartialRelieveInterface, RelieveInterface} from "../interfaces"

const validateUuid = (Id:string) => {
    const isValid = uuidValidate(Id);
     
       return isValid;
  }

export const createRelive = async (req: Request, res: Response) => {
    const {requestingOfficerId, leaveId, relievingOfficerId} = req.body;
    const requestingUser = await getOne(requestingOfficerId);
    const relievinguser = await getOne(relievingOfficerId);

    if (!requestingUser || !relievinguser) {
        return res.status(404).json({
            success: false,
            message: 'user does not exist'
        });
    };

    const leave = await getOneLeave(leaveId);

    if (!leave) {
        return res.status(404).json({
            success: false,
            message: 'leave does not exist'
        });
    }

    
    try {
       const create_relieve = await createRequest(requestingUser, relievinguser, leave);
       res.status(200).json({
        message: 'request successful',
        data: create_relieve
       })
   } catch (error) {
        console.log(error);
        res.status(500).json({message: 'internal server error', error: error.message, success: false});
   }
}

export const getByRelievingOfficer = async (req: Request, res: Response) => {
    const {relieveId} = req.params;

    const validId = validateUuid(relieveId);

    if (!validId){
        return res.status(400).json({message:"Invalid Id"});
    }

    const relievingOfficer = await getOne(relieveId);

    if (!relievingOfficer) {
        return res.status(400).json({
            success: false,
            message: "User not found"
        })
    };

    
    try {
        const relieve = await findRelievingOfficer(relievingOfficer);
        return res.status(200).json({
            success: true,
            message: "request successful",
            data: relieve
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error",
            error: error.message,
            success: false
        })
    }
}

export const find_all_relieve = async (request:Request, res: Response) => {
    const relieve = await findAllRelieve();
    return res.status(200).json(relieve);
}

export const find_one_relieve = async (req: Request, res: Response) => {
    const {relieveId} = req.params;

    const validId = validateUuid(relieveId);

    if (!validId){
        return res.status(400).json({message:"Invalid Id"});
    }

    const relieve = await findOneRelieve(relieveId);

    if (!relieve) {
        return res.status(400).json({
            message: 'Request does not exist'
        });
    } 

    return res.status(200).json({
        message: 'Request successfull',
        relieve
    })
}


export const update_relieve = async (req: Request, res: Response) => {
    const { is_viewed, accept_relieve, relieving_officer  } = req.body;
    const {relieveId} = req.params;


    const validId = validateUuid(relieveId);

    if (!validId){
        return res.status(400).json({message:"Invalid Id"});
    }

    const relieve = await findOneRelieve(relieveId);

    if (!relieve) {
        return res.status(400).json({
            success: false,
            message: "request not found"
        })
    }

    const partialRelieveData: PartialRelieveInterface = {
        is_viewed, relieving_officer, accept_relieve
    }
    
    try {
        const updatedRelieve = await updateRelieve(partialRelieveData, relieveId);
        return res.status(200).json({
            message: 'update successful',
            updateRelieve,
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

export const delete_relieve = async (req: Request, res: Response) => {
    const {relieveId} = req.params;

    const validId = validateUuid(relieveId);

    if (!validId){
        return res.status(400).json({message:"Invalid Id"});
    }

    const relieve = await deleteRelieve(relieveId);

    return res.status(200).json({
        messsage: "request successfull",
    })
}