import express from 'express';
import { loginUser, userRegister } from '../controller/userController.js';

const router = express.Router();

router.post('/create', userRegister);

router.post('/login', loginUser);

export default router;