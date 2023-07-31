import mongoose from "mongoose";
import { Schema } from "mongoose";

const categorySchema = new Schema({
    categoryName : String
}, {timestamps: true}
)

export default mongoose.model("Categories", categorySchema)