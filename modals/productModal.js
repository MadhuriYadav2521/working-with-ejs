import mongoose from "mongoose";
import { Schema } from "mongoose";

const prductSchema = new Schema({
    productName : String,
    price : Number,
    category : {
        type: mongoose.Types.ObjectId,
        ref: "Categories"
    }
})

export default mongoose.model("Products",prductSchema)