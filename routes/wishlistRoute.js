import express from 'express';
import { createWishlist } from '../controller/WishlistController.js';

const router = express.Router();

router.post('/create', createWishlist)

export default router;