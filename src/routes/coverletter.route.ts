import {Router} from "express";


const route = Router();

import {addRelievingOfficerCoverLetter, directorApproval, optAndMgtApproval} from "../controller";


route.get("/reliveletter/:Id", addRelievingOfficerCoverLetter);
route.get("/directorletter/:Id", directorApproval);
route.get("/operationsletter/:Id", optAndMgtApproval)

export {route as coverletterRoute};