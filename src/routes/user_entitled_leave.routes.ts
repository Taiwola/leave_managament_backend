import {Router} from "express";

const router = Router();

import {create_user_entitled_leave, deleteUserEntitledLeave, get_all_user_entitled_leave, get_by_user, get_one_user_entitled_leave} from "../controller"

import { authentication } from "../middlewares/authenticate";


router.get("/user_entitled", authentication, get_all_user_entitled_leave);
router.get("/user_entitled/:Id", authentication, get_one_user_entitled_leave);
router.get("/entitled_user", authentication, get_by_user)
router.post('/user_entitled', authentication, create_user_entitled_leave);
router.delete("/user_entitled/:Id", authentication, deleteUserEntitledLeave);




export {router as userEntitledLeaveRoutes}