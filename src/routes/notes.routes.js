const { Router } = require("express");
const { check } = require("express-validator");
const route = Router()

route.post('/notes', [
    check("content", "The content of the note is required").not().isEmpty(),
    check("user", "The user ID is required").not().isEmpty().isMongoId(),
    check("category", "The category ID is required").not().isEmpty().isMongoId(),
    validateFields
], createNote);

route.get('/notes', getAllNotes);

route.get('/notes/:id', getNoteById);

route.put('/notes/:id', [
    check("content", "The content of the note is required").not().isEmpty(),
    validateFields
], updateNote);

route.delete('/notes/:id', deleteNote);


module.exports = route;