import wishlistModel from "../model/wishlistModel.js";

// create
export const createWishlist = async(req, res) => {
    const {user, product} = req.body;
    console.log(user, product);
    try {
        const existWishlist = await wishlistModel.findOne({user, product});
        if(existWishlist){
            res.status(200).send({
                success: false,
                message: "Product Already Exist",
            })
        }else{
            await new wishlistModel({user, product}).save();
            res.status(200).send({
                success: true,
                message: "Product Added To Wishlist",
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}

// GET
export const getWishlist = async(req, res) => {
    const {user} = req.body;
    try {
        const wishlist = await wishlistModel.find(user);
        res.status(200).send({
            success: true,
            wishlist,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}