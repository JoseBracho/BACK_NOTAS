const { Router } = require("express");
const { check } = require("express-validator");
const route = Router()



route.post('/categories', [
    check("name", "The name of the category is required").not().isEmpty(),
    check("user", "The user ID is required").not().isEmpty().isMongoId(),
    validateFields
], createCategory);

route.get('/categories', getAllCategories);

route.get('/categories/:id', getCategoryById);

route.put('/categories/:id', [
    check("name", "The name of the category is required").not().isEmpty(),
    validateFields
], updateCategory);

route.delete('/categories/:id', deleteCategory);


module.exports = route;