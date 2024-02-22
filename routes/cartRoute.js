import express from 'express';
import { cartAdd, deleteCart, getCart, navbarData, updateCart } from '../controller/CartController.js';
const router = express.Router();

router.post('/create', cartAdd);

router.post('/get', getCart);

router.post('/update/:id', updateCart);

router.post('/delete/:id', deleteCart);

router.post('/navbar', navbarData);

export default router;