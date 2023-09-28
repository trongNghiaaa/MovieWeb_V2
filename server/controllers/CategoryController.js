import { categories } from '../data/category.js';
import Category from '../models/CategoryModel.js';
import asyncHandle from 'express-async-handler';

///////////PUBLIC

//IMPORT CATEGORY : POST: /api/categories/
export const importCategories = asyncHandle(async (req, res, next) => {
    try {
        //xóa nhưng category cũ
        await Category.deleteMany();
        //thêm mới lại category
        const category = await Category.insertMany(categories);

        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// GET ALL CATEGORIES : GET /api/categories/
export const getCategories = asyncHandle(async (req, res, next) => {
    try {
        const categories = await Category.find();

        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

///////////PRIVATE ADMIN
//CREATE CATEGORY : POST /api/categories/
export const createCategory = asyncHandle(async (req, res, next) => {
    const { name } = req.body;
    try {
        //tạo category mới
        const category = new Category({ name });
        //save vào DB
        const newCategory = await category.save();

        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//CREATE CATEGORY : PUT /api/categories/:id
export const updatedCategory = asyncHandle(async (req, res, next) => {
    try {
        // tìm category
        const category = await Category.findById(req.params.id);
        if (!category) {
            res.status(404);
            throw new Error('Category not found');
        }
        // update category
        category.name = req.body.name || category.name;
        // lưu vào DB
        const updateCategory = await category.save();

        res.status(201).json(updateCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//DELETE CATEGORY : DELETE /api/categories/:id
export const deleteCategory = asyncHandle(async (req, res, next) => {
    try {
        await Category.findByIdAndDelete(req.params.id);

        res.status(200).json('Category deleted');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
