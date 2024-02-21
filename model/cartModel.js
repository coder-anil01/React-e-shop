import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
        },
        quantity:{
            type: Number,
            default: 1,
        },
    });
export default mongoose.model('cart', cartSchema);