import {create_dept, delete_dept, update_dept, getOne, findOne_dept, findAll_dept, add_staff, remove_staff} from "../service";
import {Request, Response} from "express";
import { validateUuid } from "./user.controller";
import { User } from "../database/entity/user";


export const createDept = async (req: Request, res: Response) => {
    const {name} = req.body;
    if (!name) {
        return res.status(404).json({
            message: "required input missing"
        });
    }
   
    try {
        const dept = await create_dept(name);
    
        return res.status(200).json({
            message: "department created"
        });     
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
};

export const updateDept = async (req: Request, res: Response) => {
    const {name, id} = req.body;
    const dept_Id = req.params.Id;

    const isValid = validateUuid(id);
    if (!isValid){
        return res.status(400).json({message:"Invalid Id"});
    }

    const valid = validateUuid(dept_Id);
    if (!isValid){
        return res.status(400).json({message:"Invalid Id"});
    }

    const user: User = await getOne(id);

    if (!user) {
        return res.status(404).json({
            message: "user does not exist"
        });
    };

    
    try {
        const dept = await update_dept(dept_Id, user, name);
        return res.status(200).json({
            message: "department updated"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const addStaff = async (req: Request, res: Response) => {
    // TODO: implement this function
    const {id} = req.body;
    const {Id} = req.params;

    const isValid = validateUuid(id);
    const validId = validateUuid(Id);
    if (!isValid || !validId){
        return res.status(400).json({message:"Invalid Id"});
    }

    const deptExist = await findOne_dept(Id); 

    if (!deptExist) {
        return res.status(404).json({
            message: "Not found"
        });
    }

    const user: User = await getOne(id);

    if (!user) {
        return res.status(404).json({
            message: "user does not exist"
        });
    };

    try {
        const dept = await add_staff(Id, user);
        return res.status(200).json({
            message: "staff added"
        })
    } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "internal server error"
            });
    }
}

export const removeStaff = async(req: Request, res: Response) => {
    const {id} = req.body;
    const {Id} = req.params;

    const isValid = validateUuid(id);
    const validId = validateUuid(Id);
    if (!isValid || !validId){
        return res.status(400).json({message:"Invalid Id"});
    }

    const deptExist = await findOne_dept(Id); 

    if (!deptExist) {
        return res.status(404).json({
            message: "Not found"
        });
    }

    const user: User = await getOne(id);

    if (!user) {
        return res.status(404).json({
            message: "user does not exist"
        });
    };

    try {
        const dept = await remove_staff(user);
        return res.status(200).json({
            message: "staff removed"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error"
        });
    }

}

export const getOne_dept = async (req: Request, res: Response) => {
    const {Id} = req.params;
    const isValid = validateUuid(Id);
    if (!isValid){
        return res.status(400).json({message:"Invalid Id"});
    };

    const dept = await findOne_dept(Id);
    
    if (!dept) {
        return res.status(404).json({
            message: "Not found"
        });
    };
    return res.status(200).json({
        data: dept
    });
}

export const getAll_dept = async (req: Request, res: Response) => {
    const dept = await findAll_dept();
    return res.status(200).json({
        message: "success",
        data: dept
    });
}

export const deleteDept = async (req: Request, res: Response) => {
    const {Id} = req.params;
    const isValid = validateUuid(Id);
    if (!isValid){
        return res.status(400).json({message:"Invalid Id"});
    }

    try {
        const dept = await delete_dept(Id);
        return res.status(200).json({
            message: "department deleted successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}