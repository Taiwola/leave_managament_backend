import {Router} from "express";


const route = Router();

// import controller
import {createRelive, find_all_relieve, find_one_relieve, update_relieve, delete_relieve} from "../controller"
import { authentication } from "../middlewares/authenticate";


route.get('/relieving_officer', authentication, find_all_relieve);
route.get('/relieving_officer/:relieveId', authentication, find_one_relieve);


route.post('/relieving_officer', authentication, createRelive);
route.patch('/relieving_officer/:relieveId', authentication, update_relieve);


route.delete('/relieving_officer/:relieveId', authentication, delete_relieve);


export {route as relieveRoute};