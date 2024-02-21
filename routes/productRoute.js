import express from 'express';
import { createProduct, getAllProduct, getReletedProduct, getSingleProduct } from '../controller/productController.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/create', upload.array('images') , createProduct);

router.get('/get', getAllProduct);

router.get('/get/:id', getSingleProduct);

router.get('/getreleted/:cid/:pid', getReletedProduct);


export default router;