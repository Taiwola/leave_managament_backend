import {getOne, createLeave, getAllLeave, deleteLeave, rejectOrApprove, getUserLeaves, getOneLeave, getAllPendingLeaves, addComment, department_approval, department_reject, operations_approval, operations_reject, findOneRelieve, getOneRelieveForLeave, deleteRelieve, createRequest, updateRelieve, addRelievingOfficer} from "../service";
import {Request, Response} from "express";
import {findOne, validateUuid} from './user.controller'
import { LeaveDetails } from "../interfaces/leave.interfaces";
import {Status, Type} from "../database/entity/entity";




export const create_leave = async (req: Request, res: Response) => {
    const user_id = req.user.id;
    const {title, description, startDate, endDate, number_of_days, leave_type, relievingOfficer}: LeaveDetails = req.body;

    if (!title || !description || !startDate || !endDate || !number_of_days || !leave_type) {
        return res.status(400).json({message:"missing required inputs"});
    }

    const isValid = validateUuid(user_id);
    if (!isValid){
        return res.status(400).json({message:"Invalid Id"});
    }

    const enumValues = Object.values(Type);

if (!enumValues.includes(leave_type)) {
    return res.status(406).json({ message: "not a valid enum type" });
}

    if (!title || !description || !startDate || !endDate || !number_of_days) {
        return res.status(400).json({ error: 'Please provide all fields.' });
    }

    const userExist = await getOne(user_id);

    if (!userExist) {
        return res.status(401).json({message: 'User not found'})
    }

    const relieveOfficer = await getOne(relievingOfficer);

    const leave_data: LeaveDetails = {
        title,
        description,
        startDate,
        endDate,
        number_of_days,
        leave_type,
        relievingOfficer
    }
    
    try {
        const created = await createLeave(leave_data, userExist);
        const data = {
            requestingOfficerId: userExist,
            relievingOfficerId: relieveOfficer,
            leaveId: created,
        }

        const create_relieve = await createRequest(data.requestingOfficerId, data.relievingOfficerId, data.leaveId)
        if (!create_relieve) {
            return res.status(400).json({
                message: "something went wrong"
            });
        }

        const updateLeaveRelivingOfficer = await addRelievingOfficer(create_relieve, created.id);

        if (updateLeaveRelivingOfficer.affected <= 0) {
            return res.status(400).json({
                message: "something went wrong"
            });
        }

        return res.status(200).json({
            message: "leave successfully created",
            data: created,
            relieve: create_relieve
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error creating a new leave request' });
    }
}

export const find_all = async (req: Request, res: Response) => {
    const leaves = await getAllLeave();
    return res.status(200).json({
        data: leaves
    });
}

export const pendingLeaves = async (req: Request, res: Response) => {
    try {
        const leave = await getAllPendingLeaves();
        return res.status(200).json({
            leave
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "internal server error"
        })
    }
}

export const findAllUserLeaves = async (req: Request, res: Response) => {
    const user_id = req.user.id;
    const userExist = await getOne(user_id);

    if (!userExist) {
        return res.status(401).json({message: 'User not found'})
    }

    const leaves = await getUserLeaves(userExist);


    res.status(200).json({
        data: leaves
    })

}

export const get_one = async (req: Request, res: Response) => {
    const {Id} = req.params;
    const isValid = validateUuid(Id);
    if (!isValid){
        return res.status(400).send({error:"Invalid Id"});
    }
    try {
        const leave = await getOneLeave(Id);
        if (!leave) {
            return res.status(400).json({
                message: "leave does not exist"
            })
        }
        return res.status(200).json({
            data: leave
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error"
        })
    }
};


export const delete_leave = async (req: Request, res: Response) => {
    const { Id } = req.params;
    const isValid = validateUuid(Id);

    if (!isValid) {
        return res.status(400).json({ message: "Invalid Id" });
    }

    try {
        const relieve = await getOneRelieveForLeave(Id);

        if (!relieve) {
            try {
                await deleteLeave(Id);
                return res.status(200).json({
                    message: "Leave deleted successfully"
                });
            } catch (deleteLeaveError) {
                console.log(deleteLeaveError);
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
        } else {
            try {
                const deleteRelieveResult = await deleteRelieve(relieve.id);
                if (deleteRelieveResult.affected <= 0) {
                    return res.status(404).json({
                        message: "Leave not found or has already been deleted"
                    });
                }

                await deleteLeave(Id);
                return res.status(200).json({
                    message: "Leave deleted successfully"
                });
            } catch (deleteError) {
                console.log(deleteError);
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};



export const updateStatus = async (req: Request, res: Response) => {
    const {Id} = req.params;
    const isValid = validateUuid(Id);
    if (!isValid){
        return res.status(400).send({message:"Invalid Id"});
    }
    const {status} = req.body;

    try {
        const updatedStatus = await rejectOrApprove(Id, status);
        return res.status(200).json({
            message: "status updated",
            data: updatedStatus
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

export const addCommentToLeave = async (req: Request, res: Response) => {
    const {Id} = req.params;
    const isValid = validateUuid(Id);
    if (!isValid){
        return res.status(400).json({message:"Invalid Id"});
        }
    const {comment} = req.body;

    try {
        const addedComment = await addComment(Id, comment);
        return res.status(200).json({
            message: "comment added",
            data: addedComment
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "internal server error"
        });
    }
}


export const addLeaveCoverLetter = async (req: Request, res: Response) => {
        const {Id} = req.params;
        const isValid = validateUuid(Id);
    if (!isValid) {
        return res.status(400).json({message:"Invalid Id"});
    }

    const leaveExist = await getOneLeave(Id);

    if (!leaveExist) {
        return res.status(404).json({
            message: "Not found"
        });
    };

    const leaveDetails = {
        leaveTitle: leaveExist.title,
        firstName: leaveExist.user.firstname,
        lastName: leaveExist.user.lastname,
        numberOfDays : leaveExist.number_of_days,
        startDate : leaveExist.start_date,
        endDate : leaveExist.end_date,

    }

     // Wrap the render in a Promise to ensure it completes before Puppeteer
 await new Promise<void>((resolve, reject) => {
   res.render('index', leaveDetails, (err, html) => {
     if (err) {
      reject(err);
  } else {
         res.send(html)
         resolve();
       }
    });
  });

//      const browser = await puppeteer.launch({
//      headless: "new",
//    });
//    const page = await browser.newPage()
// await page.goto(`http://localhost:8000/api/coverletter/${Id}`).catch(error => console.error('Page navigation error:', error));; // Use the correct URL for your server
// // await page.screenshot({ path: './public/coverletter.png' });
//    await page.pdf({ path: './public/local.pdf' });
//    await browser.close();
}

export const departmentalApproval = async(req: Request, res: Response) => {
    const {Id} = req.params;
    const {director_id} = req.body;

    if (!director_id) {
        return res.status(400).json({message: "required field missing"})
    }

    const isValid = validateUuid(Id);
    const valid = validateUuid(director_id);
    if (!isValid || !valid) {
        return res.status(400).json({message:"Invalid Id"});
    };

    const userExist = await getOne(director_id);

    if (!userExist.directorOf) {
        return res.status(401).json({message: "not authorized"});
    };

    try {
        const approved = await department_approval(Id);
        return res.status(200).json({message: "Approved at departmental level"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error"
        });
    }
}

export const departmentReject = async (req: Request, res: Response) => {
    const {Id} = req.params;
    const {director_id} = req.body;

    if (!director_id) {
        return res.status(400).json({message: "required field missing"})
    }

    const isValid = validateUuid(Id);
    const valid = validateUuid(director_id);
    if (!isValid || !valid) {
        return res.status(400).json({message:"Invalid Id"});
    };

    const userExist = await getOne(director_id);

    if (!userExist.directorOf) {
        return res.status(401).json({message: "not authorized"});
    };

    try {
        const reject = await department_reject(Id);
        const status = await rejectOrApprove(Id, Status.reject)
        return res.status(200).json({message: "Rejected"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error"
        });
    }
}

export const operationsApproval = async(req: Request, res: Response) => {
    const {Id} = req.params;
    const {director_id} = req.body;

    if (!director_id) {
        return res.status(400).json({message: "required field missing"})
    }

    const isValid = validateUuid(Id);
    const valid = validateUuid(director_id);
    if (!isValid || !valid) {
        return res.status(400).json({message:"Invalid Id"});
    };

    const userExist = await getOne(director_id);

    if (!userExist.directorOf) {
        return res.status(401).json({message: "not authorized"});
    };

    try {
        const approved = await operations_approval(Id);
        return res.status(200).json({message: "Approved at operation and maagement level"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error"
        });
    }
}

export const operationReject = async (req: Request, res: Response) => {
    const {Id} = req.params;
    const {director_id} = req.body;

    if (!director_id) {
        return res.status(400).json({message: "required field missing"})
    }

    const isValid = validateUuid(Id);
    const valid = validateUuid(director_id);
    if (!isValid || !valid) {
        return res.status(400).json({message:"Invalid Id"});
    };

    const userExist = await getOne(director_id);

    if (!userExist.directorOf) {
        return res.status(401).json({message: "not authorized"});
    };

    try {
        const reject = await operations_reject(Id);
        const status = await rejectOrApprove(Id, Status.reject)
        return res.status(200).json({message: "Rejected"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error"
        });
    }
}