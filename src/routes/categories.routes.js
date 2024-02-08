const { Router } = require("express");
const { check } = require("express-validator");
const route = Router()

const validateToken = require("../middlewares/validateToken");
const validateFields = require("../middlewares/validateFields");

const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory } = require("../controllers/categories.controllers")

route.post('/categories', [
    validateToken,
    check("name", "The name of the category is required").not().isEmpty(),
    validateFields
], createCategory);
route.get('/categories', validateToken, getAllCategories);
route.get('/categories/:id', validateToken, getCategoryById);
route.put('/categories/:id', [
    validateToken,
    check("name", "The name of the category is required").not().isEmpty(),
    validateFields
], updateCategory);
route.delete('/categories/:id', validateToken, deleteCategory);

module.exports = route;