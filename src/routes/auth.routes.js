const { Router } = require("express");
const { check } = require("express-validator");
const route = Router()

const { login, register } = require("../controllers/auth.controllers");
const { 
    nameValidator, 
    passwordValidator, 
    userNameValidator } = require("../helpers/validateUsers");
const validateFields = require("../middlewares/validateFields");

route.post('/login', [
    check("userName", "You must enter the userName").not().isEmpty(),
    check("password", "You must enter the password").not().isEmpty(),
    validateFields
],login)

route.post('/register', [
    check("userName", "Please enter the userName").not().isEmpty(),
    check("password", "Please enter the password").not().isEmpty(),
    check("name").custom(nameValidator),
    check("userName").custom(userNameValidator),
    check("password").custom(passwordValidator),
    validateFields
],register)

module.exports = route;