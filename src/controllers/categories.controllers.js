const Category = require('../models/categoryModel'); 

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user.id; 
        const newCategory = new Category({ name, user: userId });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
const getAllCategories = async (req, res) => {
    try {
        const userId = req.user.id; 
        const categories = await Category.find({ user: userId }).populate('user', 'userName');
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('user', 'userName');
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        const userId = req.user.id;
        if (category.user._id.toString() !== userId) {
            return res.status(403).json({ msg: 'User not authorized to view this category' });
        }
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user.id;
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        if (category.user.toString() !== userId) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { $set: { name } }, { new: true });
        res.json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        const userId = req.user.id;
        if (category.user.toString() !== userId) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        await category.remove();
        res.json({ msg: 'Category removed' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}