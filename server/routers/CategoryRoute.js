import express from 'express';
import { admin, protect } from '../middleware/Auth.js';
import {
    createCategory,
    deleteCategory,
    getCategories,
    importCategories,
    updatedCategory,
} from '../controllers/CategoryController.js';
const router = express.Router();

// public
router.get('/', getCategories);
router.post('/import/all', importCategories);

//private admin
router.post('/', protect, admin, createCategory);
router.put('/:id', protect, admin, updatedCategory);
router.delete('/:id', protect, admin, deleteCategory);

export default router;
