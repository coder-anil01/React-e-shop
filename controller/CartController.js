import cartModel from "../model/cartModel.js";
import wishlistModel from "../model/wishlistModel.js";

export const cartAdd = async(req, res) => {
    const {user, product, quantity} = req.body;
    try {
        const existItemCart = await cartModel.findOne({user, product});
        if(existItemCart){
            existItemCart.quantity += 1;
            await existItemCart.save();
            res.status(200).send({
                success: true,
                message: "More Added To Cart",

            });
        }else{
            await new cartModel({user, product, quantity}).save();
            res.status(200).send({
                success: true,
                message: "Added To Cart",
                new: true,
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
        })
    }
}

// GET CART
export const getCart = async(req, res) => {
    const {user} = req.body;
    try {
        const cart = await cartModel.find({user}).populate('product');
        res.status(200).send({
            success: true,
            cart,
            total: cart.length,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}

// Update CART
export const updateCart = async(req, res) => {
    const {quantity} = req.body;
    const {id} = req.params;
    try {
        const cart = await cartModel.findByIdAndUpdate(id, {quantity});
        res.status(200).send({
            success: true,
            cart,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}

// DELETE CART
export const deleteCart = async(req, res) => {
    const {id} = req.params;
    try {
        await cartModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Remove Item In Cart",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}


// NAVBAR
export const navbarData = async(req, res) => {
    const {userId} = req.body;
    console.log(userId);
    try {
        const cartItem = await cartModel.find({user: userId});
        const wishlistItem = await wishlistModel.find({user: userId});
        res.status(200).send({
            success: true,
            cartItem: cartItem.length,
            wishlistItem: wishlistItem.length,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}