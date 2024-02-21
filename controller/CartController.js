import cartModel from "../model/cartModel.js";

export const cartAdd = async(req, res) => {
    const {product, user, quantity} = req.body;
    console.log(product, user, quantity);
    try {
        const cart = await cartModel({product, user, quantity}).save();
        res.status(200).send({
            success: true,
            cart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}

// GET CART
export const getCart = async(req, res) => {
    const {user} = req.body;
    try {
        const cart = await cartModel.find({user});
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}