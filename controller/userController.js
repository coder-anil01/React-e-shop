import userModel from "../model/userModel.js";
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import addressModel from "../model/addressModel.js";

dotenv.config();
const jwtsecret = process.env.JWT_SECRET;

// REGISTER
export const userRegister = async(req, res) => {
    const {name, email, password, answer, role, phone, phonesec, firstat, secndat, city, state, pin} = req.body;
    try {
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(200).send({ success: false, message: "Alredy Registered User"})
        }else{
            const hashedPassword = await bcrypt.hash(password, 10)
            const address = await addressModel({phone, phonesec, firstat, secndat, city, state, pin}).save();
            const user = await userModel({name, email, password: hashedPassword, answer, deliverat: address._id, role}).save();
            const token = await JWT.sign({user}, jwtsecret);
            res.status(200).send({
                success: true,
                message: "Register Successfully",
                user,
                token,
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

//LOGIN
export const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try {
        const existUser = await userModel.findOne({email});
        if(!existUser){
            return res.status(200).send({ success: false, message: "User Not Exist"});
        }
        const match = await bcrypt.compare(password, existUser.password);
        if (!match) {
            return res.status(200).send({
              success: false,
              message: "Inviled Password",
            });
          }
          const token = await JWT.sign({_id: existUser._id}, jwtsecret);
          res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: existUser,
            token,
          })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}



// ADDRESS
export const addAddress = async(req, res) => {
    const {userId, phone, phonesec, firstat, secndat, city, pin, state} = req.body;
    console.log(userId, phone, phonesec, firstat, secndat, city, pin, state);
    try {
        const address = await new addressModel({phone, phonesec, firstat, secndat, city, pin, state}).save();
        const user = await userModel.findByIdAndUpdate(userId, {deliverat: address._id}).populate('deliverat');
        const token = await JWT.sign({user}, jwtsecret);
        console.log(user)
        res.status(200).send({
            success: true,
            user,
            token,
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