import {Request, Response} from "express";
import {createEntitledUserLeave, getAllUserEntitledLeave, getOneUserEntitledLeave, getOneByUser, updateEntitledUserLeave, delUserEntitledLeave, getOne, getEntitledLeaveByGradeLevel} from "../service";
import { validate } from "uuid";


export const create_user_entitled_leave = async (req: Request, res: Response) => {
    const userId = req.user.id;

    const userExist = await getOne(userId);

    if (!userExist) {
        return res.status(400).json({
            message: "Request does not exist"
        })
    };

    

    try {
        const entitledNumbOfDays = await getEntitledLeaveByGradeLevel(userExist.gradeLevel);

        if (!entitledNumbOfDays) {
            return res.status(400).json({
                message: "Request was unsuccessful"
            });
        }

        const number_of_days = entitledNumbOfDays.numberOfDays;
        const currentYear = new Date().getFullYear();

        const createUserEntitledLeave = await createEntitledUserLeave(currentYear, userExist, number_of_days)

        return res.status(200).json({
            message: "request was successful",
            data: createUserEntitledLeave
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

export const get_all_user_entitled_leave = async (req: Request, res: Response) => {
    const entitled = await getAllUserEntitledLeave();
    res.status(200).json({
        message: "request successful",
        data: entitled
    });
};

// export const get_one_user_entitled_leave = async (req: Request, res: Response) => {
//     const {Id} = req.params;

//     const validId = validate(Id);

//     if (!validId) {
//         return res.status(400).json({
//             message: "request invalid"
//         });
//     };

//     try {
//         const entitled = await getOneUserEntitledLeave(Id)
//         return res.status(200).json({
//             message: "request successful",
//             data: entitled
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "internal server error"
//         })
//     }
// };

export const get_one_user_entitled_leave = async (req: Request, res: Response) => {
    const {Id} = req.params;
    const userId = req.user.id;

    const validId = validate(Id);

    if (!validId) {
        return res.status(400).json({
            message: "request invalid"
        });
    };

    const user = await getOne(userId);

    if (!user) {
        return res.status(400).json({
            message: "request does not exist"
        }); 
    }

    const entitled = await getOneUserEntitledLeave(Id);
    const current = new Date().getFullYear();

    if (entitled.currentYear !== current) {
        try {
            const entitledNumbOfDays = await getEntitledLeaveByGradeLevel(user.gradeLevel);
            const updateUserEntitled = await updateEntitledUserLeave(Id, entitledNumbOfDays.numberOfDays ,current );
            const updatedEntitled = await getOneUserEntitledLeave(Id);

            return res.status(200).json({
                message: "Number of days resetted",
                data: updatedEntitled
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "internal server error"
            })
        }
    } else {
        try {
            return res.status(200).json({
                message: "Request successful",
                data: entitled
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "internal server error"
            })
        }
    }


}

export const get_by_user = async (req: Request, res: Response) => {
    try {
        const usrId = req.user.id;

        const user = await getOne(usrId);
    
        const getEntitled = await getOneByUser(user);
    
        return res.status(200).json({
            data: getEntitled
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error"
        })
    }
}


export const deleteUserEntitledLeave = async (req: Request, res: Response) => {
    const {Id} = req.params;

    const validId = validate(Id);
    if (!validId) {
        return res.status(400).json({
            message: "request invalid"
        });
    };

    try {
        const del = await delUserEntitledLeave(Id);
        return res.status(200).json({
            message: "Request successful"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error" 
        })
    }
}