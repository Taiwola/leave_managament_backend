import {Router} from "express";
import {getAll, findOne, updateUser, deleteUser, updatePassword} from "../controller";
import { validateRequest } from "../middlewares/validator";
import { authentication } from "../middlewares/authenticate";

const route = Router();

route.get('/user/all', authentication, getAll);
route.get('/user/:Id', authentication, findOne);

route.patch("/user/:Id", authentication, updateUser);
route.patch("/user/password/:id", authentication, updatePassword)


route.delete("/user/:Id", authentication, deleteUser);



export {route as userRoute};