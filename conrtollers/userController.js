import Users from "../modals/userModal.js"
import bcrypt from "bcrypt"
import session from "express-session"

export const renderRegister = async (req,res) =>{
    try{
        return res.render('register')
    }catch(err){
        return res.send(err)
    }
}

export const register = async (req,res)=>{
    try{
        const{ userName, email, passsword} = req.body;
        if(!userName) return res.render('register', {message : "User name is required!"})
        if(!email) return res.render('register', {message : "User email is required!"})
        if(!passsword) return res.render('register', {message : "Password is required!"})
        const hashedPassword = bcrypt.hashSync(passsword, 10)
        const existingUser = await Users.findOne({email}).exec();
        if(existingUser) return res.render('register', {message: "User already exist!"})
        const user = new Users({
            userName, email, password : hashedPassword
        })
        await user.save();
        return res.redirect('/')
    }catch(err){
        return res.send(err)
    }
}

export const renderLogin = async (req,res) => {
    try{
        return res.render('login')
    }catch(err){
        return res.send(err)
    }
}

export const login = async (req,res) => {
    try{
        const {email, password} = req.body
        if(!email) return res.render('login', {message : "Email is required!"})
        if(!password) return res.render('login', {message : "Password is required!"})
        const user = await Users.findOne({email}).exec();
        if(!user) return res.render('login', {message : "User does not exist!"})
        const isPasswordCorrect = bcrypt.compareSync(password, user.password)
        if(isPasswordCorrect){
            if(user.role == 'Admin'){
                req.session.user_id = user._id
                return res.redirect('/adminDashboard')
            }else{
                req.session.user_id = user._id
                return res.redirect('/votingPage')
            }
        }else {
            return res.render('login',{message: "Email or Password is incorrect!"})
        } 
    }catch(err){
        return res.send(err)
    }
}

export const renderVotingPage = async (req,res) =>{
    try{
        return  res.render('votingPage',{name : req.session.user_id})
    }catch(err){
        return res.send(err)
    }
}

export const votingPage = async (req,res) =>{
    try{

    }catch(err){
        return res.send(err)
    }
}

export const renderAdminDashboard = async (req,res) =>{
    try{
        return res.render('adminDashboard')
    }catch(err){
        return res.send(err)
    }
}