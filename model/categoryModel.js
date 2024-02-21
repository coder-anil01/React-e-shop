import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
        name:{
            type: String,
            require: true,
            unique : true,
        },
        image:{
            type: String,
            require: true
        }
    });
export default mongoose.model('category', categorySchema);