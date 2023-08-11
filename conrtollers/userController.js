import Users from "../modals/userModal.js"
import Candidates from "../modals/candidateModal.js"
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
        const id = req.session.user_id
        const rCandidate = await Candidates.find({}).exec();
        const voterName = await Users.findById({_id: id})
        const votedCandidate = await Candidates.findOne({votes : id}).exec();
        return  res.render('votingPage',{ rCandidate ,vname : voterName.userName, votedCandidate})
    }catch(err){
        return res.send(err)
    }
}
// if candidate is voted make sure voter dont go to voting page again, set middleware

export const votingPage = async (req,res) =>{
    try{
        // to use multiple times session id store it in variable: id = req.session.user_id
        const id = req.session.user_id
        const {candidateName} = req.body 
        const voterName = await Users.findById({_id: id})
        const rCandidate = await Candidates.find({}).exec();
        const votedCandidate = await Candidates.findOne({votes : id}).exec();
        // while rendering page again send all data that is required. Ex. data of get method.
        if(votedCandidate) return res.render('votingPage',{votedCandidate})
        if(!candidateName) return res.render('votingPage',{rCandidate,vname : voterName.userName, message : "Select one candidate!"})
        console.log(candidateName);
        const candidate = await Candidates.findOneAndUpdate({ candidateName }, {$push : {votes : id}}).exec();
        console.log(req.session.user_id);
        await candidate.save()
        return res.render('voteSuccess', {message: `Voted successfully for ${candidateName}`})
        
    }catch(err){
        return res.send(err)
    }
}

export const renderAdminDashboard = async (req,res) =>{
    try{
        const candidate = await Candidates.find({}).exec();
        return res.render('adminDashboard', {candidate})
    }catch(err){
        return res.send(err)
    }
}