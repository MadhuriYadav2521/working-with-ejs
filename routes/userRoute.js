import express from "express"
import { login, logout, register, renderAdminDashboard, renderLogin, renderRegister, renderVoteSuccess, renderVotingPage, votingPage } from "../conrtollers/userController.js"
import { isAdminLogin, isLogin, isLogout, isUserLogin } from "../middlewares/auth.js";

const userRouter = express.Router()

userRouter.get('/register',isLogout,renderRegister);
userRouter.post('/register',register);
userRouter.get('/',isLogout,renderLogin);
userRouter.post('/',login);
userRouter.get('/votingPage',isLogin,isUserLogin,renderVotingPage)
userRouter.post('/votingPage',votingPage)
userRouter.get('/adminDashboard',isLogin,isAdminLogin,renderAdminDashboard)
userRouter.get('/voteSuccess',isLogin,isUserLogin,renderVoteSuccess)
userRouter.post('/logout',isLogin,isUserLogin,logout)






export default userRouter

