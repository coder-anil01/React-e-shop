import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
        },
    });
export default mongoose.model('wishlist', wishlistSchema);