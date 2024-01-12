import {Router} from "express";


const route = Router();

import {create_leave, find_all, findAllUserLeaves, get_one, delete_leave, updateStatus, pendingLeaves, addCommentToLeave, addLeaveCoverLetter, departmentalApproval, departmentReject, operationsApproval, operationReject} from '../controller';
import { authentication } from "../middlewares/authenticate";

route.get('/leave', authentication, find_all);
route.get('/leave/user', authentication, findAllUserLeaves);
route.get("/leave/:Id", authentication, get_one);
route.get("/pending", authentication, pendingLeaves);
route.get('/coverletter/:Id', addLeaveCoverLetter)

route.post('/leave', authentication, create_leave);
route.patch('/leave/:Id', authentication, updateStatus);
route.patch('/leave/comment/:Id', authentication, addCommentToLeave)
route.patch('/leave/department/:Id', authentication, departmentalApproval);
route.patch('/leave/department/reject/:Id', authentication, departmentReject);
route.patch('/leave/operation/:Id', authentication, operationsApproval);
route.patch('/leave/operation/reject/:Id', authentication, operationReject);

route.delete('/leave/:Id', authentication, delete_leave);



export {route as leaveRouter}