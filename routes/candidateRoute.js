import express from "express"
import { renderAddCandidate } from "../conrtollers/candidateController.js";
import { isAdminLogin, isLogin } from "../middlewares/auth.js";

const candidateRouter = express.Router()

candidateRouter.get('/addCandidate',isLogin,isAdminLogin,renderAddCandidate)






export default candidateRouter;