import { Request, Response } from "express";
import { validateUuid } from "./user.controller";
import {getOneLeave, findOneRelieve, findOne_dept} from "../service";
import { Approval_type } from "../database/entity/entity";


function getCurrentDateTime() {
    const currentDate = new Date();
    
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
    return formattedDateTime;
}

export const addRelievingOfficerCoverLetter = async (req: Request, res: Response) => {
    const {Id} = req.params;
    console.log('here')

    const isValid = validateUuid(Id);

    if (!isValid) {
        return res.status(400).json({message:"Invalid Id"});
    }

    const relieveId = await findOneRelieve(Id);

    if (!relieveId) {
        return res.status(400).json({
            message: "request does not exist"
        });
    };

    if (relieveId.accept_relieve === false || relieveId.accept_relieve === null) {
        return res.status(403).json({message: "Your request is not yet approved"})
    }

    const dataDetails = {
        relivingOfficerName: relieveId.relieving_officer.firstname + " " + relieveId.relieving_officer.lastname,
        requestingOfficerName: relieveId.requesting_officer.firstname + " " + relieveId.requesting_officer.lastname,
        leaveStartDate: relieveId.relieve_leave.start_date,
        leaveEndDate: relieveId.relieve_leave.end_date,
        acceptanceDate: relieveId.acceptance_date,
    };

    await new Promise<void>((resolve, reject) => {
        res.render('relieve', dataDetails, (err, html) => {
          if (err) {
           reject(err);
       } else {
              res.send(html)
              resolve();
            }
         });
       });
}


export const directorApproval = async (req: Request, res: Response) => {
    const {Id} = req.params;
    const isValid = validateUuid(Id);

    if (!isValid) {
        return res.status(400).json({message:"Invalid Id"});
    }
    const leave = await getOneLeave(Id);

    if (!leave) {
        return res.status(404).json({message:'Requested leave does not exist'});
    };

    if (leave.departmental_approval !== Approval_type.reviewed) {
        return res.status(404).json({
            message: 'Not authorized'
        });
    }

    const dataDetails = {
        requestingOfficerName: leave.user.firstname + " " + leave.user.lastname,
        date: 11-2-2024
    }

    
    await new Promise<void>((resolve, reject) => {
        res.render('director', dataDetails, (err, html) => {
          if (err) {
           reject(err);
       } else {
              res.send(html)
              resolve();
            }
         });
       });    
}


export const optAndMgtApproval = async (req: Request, res: Response) => {
    const {Id} = req.params
    const {departmentId} = req.body;

    const isValid = validateUuid(Id);
    const departmentValid = validateUuid(departmentId);

    if (!isValid || departmentValid) {
        return res.status(400).json({message:"Invalid Id"});
    }

    const leave = await getOneLeave(Id);

    if (!leave) {
        return res.status(404).json({message:'Requested leave does not exist'});
    };

    const department = await findOne_dept(departmentId);

    if (!department) {
        return res.status(400).json({
            message: "Request not found"
        });
    };

    const signature = department.director.signature;

    const dataDetails = {
        requestingOfficerName: leave.user.firstname + " " + leave.user.lastname,
        leaveStartDate: leave.start_date,
        leaveEndDate: leave.end_date,
        date: getCurrentDateTime()
    };


    await new Promise<void>((resolve, reject) => {
        res.render('operation', dataDetails, (err, html) => {
          if (err) {
           reject(err);
       } else {
              res.send(html)
              resolve();
            }
         });
       });    
}