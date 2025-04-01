// const express = require('express');
// const CategoryController = require('../controllers/CategoryController.js');
import express from 'express';
import CategoryController from '../controllers/CategoryController.js'

const router = express.Router();

router.post('/', CategoryController.createCategory);
router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

export default router;