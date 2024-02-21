import express from 'express';
import { createCategory, deleteCategory, editCategory, getCategory } from '../controller/categoryController.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/create', upload.single('file'), createCategory)

router.get('/get', getCategory)

router.post('/update', upload.single('file'), editCategory)

router.delete('/delete/:id', deleteCategory)


export default router;