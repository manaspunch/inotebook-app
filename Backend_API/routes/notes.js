const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator')
const fetchUSer = require('../middleware/FetchUser');

// ROUTE 1: Get all the notes by using: GET "/api/notes/FetchAllNotes". Doesn't require auth
router.get('/FetchAllNotes', fetchUSer, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        if (!notes) { return res.status(404).send('There is no Notes found for this user Id..!'); }
        res.json(notes);
    } catch (error) {
        console.error("Some internal server error occured..!");
        res.send(res.status(500).json(error));
    }

})

// ROUTE 2: Add a notes by using: POST "/api/notes/Addnote". It's require auth
router.post('/AddNote', fetchUSer, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    // description must be at least 5 chars long
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

// ROUTE 3: Update a notes by using: PUT "/api/notes/UpdateNote/id". It's require auth
router.put('/UpdateNote/:id', fetchUSer, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create new note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note need to update
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send('Note not found..!'); }

        // Check if the user is valid to update the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Invalid user to update the note..!');
        }

        // Update the note with valid user
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.send(note);
    } catch (error) {
        console.error("Some internal server error occured..!");
        res.send(res.status(500).json(error));
    }

})

// ROUTE 4: Deleting  a notes by using: DELETE "/api/notes/DeleteNote/id". It's require auth
router.delete('/DeleteNote/:id', fetchUSer, async (req, res) => {
    const { title, description, tag } = req.body;
    try {


        // Create new note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note need to delete
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send('Note not found..!'); }

        // Check if the user is valid to delete the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Invalid user to delete the note..!');
        }

        // Delete the note with valid user
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": 'Note has been deleted.', note: note });

    } catch (error) {
        console.error("Some internal server error occured..!");
        res.send(res.status(500).json(error));
    }

})
module.exports = router
