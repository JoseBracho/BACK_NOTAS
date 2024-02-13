const { Router } = require("express");
const { check } = require("express-validator");
const route = Router()


const validateToken = require("../middlewares/validateToken");
const validateFields = require("../middlewares/validateFields");

const {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
}   = require("../controllers/note.controllers")


route.post('/notes', [
    validateToken,
    check("title", "The title of the note is required").not().isEmpty(),
    check("content", "The content of the note is required").not().isEmpty(),
    check("category", "The category ID is required").not().isEmpty().isMongoId(),
    validateFields
], createNote);
route.get('/notes/category/:categoryId', validateToken, getAllNotes);
route.get('/notes/:id', validateToken, getNoteById);
route.put('/notes/:id', validateToken, updateNote);
route.delete('/notes/:id', validateToken, deleteNote);

module.exports = route;