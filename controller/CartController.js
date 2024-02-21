import cartModel from "../model/cartModel.js";

export const cartAdd = async(req, res) => {
    const {user, product, quantity} = req.body;
    console.log(user, product, quantity);
    try {
        const cart = await new cartModel({user, product, quantity}).save();
        res.status(200).send({
            success: true,
            cart,
        });
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