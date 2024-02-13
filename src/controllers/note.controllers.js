const Note = require('../models/noteModel'); 

const createNote = async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const user = req.user.id; 
        const newNote = new Note({
            title,
            content,
            user,
            category
        });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
const getAllNotes = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const notes = await Note.find({ category: categoryId }).populate('category', 'name').populate('user', 'userName');
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        res.json(note);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
const updateNote = async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        note.title = title || note.title;
        note.content = content || note.content;
        note.category = category || note.category;
        const updatedNote = await note.save();
        res.json(updatedNote);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await Note.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Note removed' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
}