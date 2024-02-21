import express from 'express';
import { cartAdd } from '../controller/CartController.js';
const router = express.Router();

router.post('/create', cartAdd);

export default router;