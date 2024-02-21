import productModel from "../model/productModel.js";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDNEARY_NAME,
    api_key: process.env.CLOUDNEARY_API_KEY,
    api_secret: process.env.CLOUDNEARY_API_SECRET,
  });

// CREATE PRODUCT
export const createProduct = async (req, res) => {
    const {title, price, rating, category, usergender, description, desPoints} = req.body;
    const images = req.body.images;
    const imagesUrl = [];
    try {
        for (let i = 0; i < images.length; i++) {
            const imagePath = images[i];
            const result = await cloudinary.uploader.upload(imagePath);
            let url = result.url;
            imagesUrl.push(url);
        }
 
        const product = await new productModel({title, description, image: imagesUrl[0], images: [imagesUrl[1], imagesUrl[2], imagesUrl[3]], category, price, rating, usergender, desPoints}).save();
        res.status(200).send({
            success: true,
            message: "Created Product",
            product,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}

// GET ALL PRODUCT
export const getAllProduct = async(req, res) => {
    try {
        const products = await productModel.find({}).select('-images -desPoints -description -usergender').sort({ createdAt: -1});
        res.status(200).send({
            success: true,
            Total: products.length,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}

// GET SINGLE PRODUCT
export const getSingleProduct = async(req, res) => {
    const {id} = req.params;
    try {
        const product = await productModel.findById(id);
        res.status(200).send({
            success: true,
            product,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}
// GET SINGLE PRODUCT
export const getReletedProduct = async(req, res) => {
    const {cid, pid} = req.params;
    try {
        const product = await productModel.find({category:cid, _id: {$ne: pid}});
        res.status(200).send({
            success: true,
            product,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}