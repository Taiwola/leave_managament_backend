import {Router} from "express";


const route = Router();

import {addRelievingOfficerCoverLetter, directorApproval} from "../controller";


route.get("/reliveletter/:Id", addRelievingOfficerCoverLetter);
route.get("/directorletter/:Id", directorApproval)

export {route as coverletterRoute};