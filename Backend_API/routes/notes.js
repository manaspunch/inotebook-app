const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator')
const fetchUSer = require('../middleware/FetchUser');

// ROUTE 1: Get all the notes by using: GET "/api/notes/FetchAllNotes". Doesn't require auth
router.get('/FetchAllNotes', fetchUSer, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error("Some internal server error occured..!");
        res.send(res.status(500).json(error));
    }

})

// ROUTE 2: Add a notes by using: POST "/api/notes/Addnote". It's require auth
router.post('/AddNote', fetchUSer, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    // password must be at least 5 chars long
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const saveNote = await note.save();
            res.json(saveNote);

        } catch (error) {
            console.error("Some internal server error occured..!");
            res.send(res.status(500).json(error));
        }

    })

module.exports = router
