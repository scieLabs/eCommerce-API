import express from 'express';
import { getCategories, createCategory, updateCategory, deleteCategory, getCategoryById } from '../controllers/categoryController.js';

const router = express.Router();

// Route to get all categories
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;