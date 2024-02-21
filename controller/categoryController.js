import categoryModel from "../model/categoryModel.js";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDNEARY_NAME,
    api_key: process.env.CLOUDNEARY_API_KEY,
    api_secret: process.env.CLOUDNEARY_API_SECRET,
  });


//*************  CREATE   *************//
export const createCategory = async(req, res) => {
    const {name, image} = req.body;
    try {
        const existCategory = await categoryModel.findOne({name});
        if(existCategory){
            return res.status(200).send({success:false, message: "Already Exist"})
        }else{
            const hostimage = await cloudinary.uploader.upload(image,{folder: 'eshop'});
            const category = await new categoryModel({name, image: hostimage.url}).save();
            res.status(200).send({
                success: true,
                message: "Category Created",
                category,
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}

//*************  GET   *************//
export const getCategory = async(req, res) => {
    try {
        const category = await categoryModel.find();
        res.status(200).send({
            success: true,
            message: "Category Created",
            category,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}

//*************  UPDATE   *************//
export const editCategory = async(req, res) => {
    const {id, name, image} = req.body;
    console.log(id, name, image)
    try {
        const existCategory = await categoryModel.findById(id);
        // console.log(existCategory)
        if(existCategory){
            if(image){
                const hostimage = await cloudinary.uploader.upload(image, {folder: 'eshop'});
                await categoryModel.findByIdAndUpdate(id, {name, image: hostimage.url});
                res.status(200).send({
                    success: true,
                    message: "Updated Succeessfully",
                })
            }else{
                await categoryModel.findByIdAndUpdate(id, {name});
                res.status(200).send({
                    success: true,
                    message: "Updated Succeessfully",
                })
            }
        }else{
            return res.status(200).send({
                success: false, message: 'Categort Not Found',
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}

//*************  UPDATE   *************//
export const deleteCategory = async(req, res) => {
    const {id} = req.params;
    try {
       const category = await categoryModel.findByIdAndDelete(id);
       res.status(200).send({
        success: true,
        message: "Category Delate Successfully",
        category,
       })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}

