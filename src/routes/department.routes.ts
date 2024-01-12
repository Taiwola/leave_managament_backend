import {Router} from "express";


const route = Router();

import {createDept, deleteDept, updateDept, getAll_dept, getOne_dept, addStaff, removeStaff} from "../controller";
import { authentication } from "../middlewares/authenticate";

route.get("/department", authentication, getAll_dept);
route.get("/department/:Id", authentication, getOne_dept);

route.post("/department", authentication, createDept);
route.patch("/department/:Id", authentication, updateDept);
route.patch("/department/add/:Id", authentication, addStaff);
route.patch("/department/remove/:Id", authentication, removeStaff)
route.delete("/department/:Id", authentication, deleteDept);

export {route as deptRoute}