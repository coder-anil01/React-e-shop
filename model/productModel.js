import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    description:{
        type: String,
    },
    image:{
        type: String,
    },
    images:[{
        type: String,
    },],
    category:{
        type: mongoose.Schema.Types.ObjectId,
    },
    price:{
        type: Number,
    },
    rating:{
        type: String,
    },
    usergender:{
        type: String,
        default: "Male, Female"
    },
    desPoints:[{
        type: String,
    },],
    },{ timestamps: true }
);

export default mongoose.model("product", productSchema);