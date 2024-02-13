import {Router} from "express";
import {create_entitled_leave, get_all_entitled, get_one_entitled, delete_entitled_leave} from "../controller"

const router = Router();

import { authentication } from "../middlewares/authenticate";


router.get("/entitled_leave", authentication, get_all_entitled);
router.get("/entitled_leave/:Id", authentication,get_one_entitled);

// @desc    Create a new entitled leave request
// @route   POST /api/v1/entitlements/leaves
// @access  Private (Authenticated users)
router.post('/entitled_leave', authentication,create_entitled_leave);

router.delete("/entitled_leave/:Id", authentication, delete_entitled_leave);



export {router as entitled_leaveRoute};