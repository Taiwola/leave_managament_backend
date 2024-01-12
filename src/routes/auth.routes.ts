import {Router} from "express";


const route = Router();

import {registerUser, signIn, logUserOut} from "../controller";
import { authentication } from "../middlewares/authenticate";

route.post('/auth/register', registerUser);
route.post('/auth/signin', signIn);
route.post('/auth/logout', authentication, logUserOut);


export {route as authRoute}