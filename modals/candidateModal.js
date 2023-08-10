import mongoose from "mongoose";
import { Schema } from "mongoose";

 const candidateSchema = new Schema({
    candidateName : String,
    votes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }]
 }, { timestamps : true }
 )

export default mongoose.model("Candidates", candidateSchema)
