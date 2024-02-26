import express from "express";
import {
  addAddress,
  loginUser,
  userRegister,
} from "../controller/userController.js";

const router = express.Router();

router.post("/create", userRegister);

router.post("/login", loginUser);

router.post("/address", addAddress);

export default router;
