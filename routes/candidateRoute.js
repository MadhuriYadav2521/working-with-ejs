import express from "express"
import { addCandidate, renderAddCandidate } from "../conrtollers/candidateController.js";
import { isAdminLogin, isLogin } from "../middlewares/auth.js";

const candidateRouter = express.Router()

candidateRouter.get('/addCandidate',isLogin,isAdminLogin,renderAddCandidate)
candidateRouter.post('/addCandidate',addCandidate)






export default candidateRouter;