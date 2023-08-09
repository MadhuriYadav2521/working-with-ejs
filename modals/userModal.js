import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    userName : String,
    email : String,
    password : String,
    role : {
        type : String,
        default : "Voter"
    }
    
})

export default mongoose.model("Users",userSchema)