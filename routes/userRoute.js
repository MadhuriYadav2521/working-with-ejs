import express from "express"
import { login, register, renderAdminDashboard, renderLogin, renderRegister, renderVotingPage } from "../conrtollers/userController.js"
import { isAdminLogin, isLogin, isLogout, isUserLogin } from "../middlewares/auth.js";

const userRouter = express.Router()

userRouter.get('/register',isLogout,renderRegister);
userRouter.post('/register',register);
userRouter.get('/',isLogout,renderLogin);
userRouter.post('/',login);
userRouter.get('/votingPage',isLogin,isUserLogin,renderVotingPage)
userRouter.get('/adminDashboard',isLogin,isAdminLogin,renderAdminDashboard)






export default userRouter

