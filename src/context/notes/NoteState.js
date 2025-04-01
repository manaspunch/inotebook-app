import React, { useState } from 'react'
import NoteContext from './NoteContext'



const NoteState = (props) => {
    const host = "http://localhost:5000";
    const [notes, setNotes] = useState([]);
    const authToken = localStorage.getItem('token');
    const getNotes = async () => {
        // API call to fetch all notes
        try {
            const response = await fetch(`${host}/api/notes/FetchAllNotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken
                }

            });
            const json = await response.json();
            setNotes(json);

        } catch (error) {
            console.error(error.message);
        }

    }
    // Add a note
    const addNote = async (title, description, tag) => {
        // API call for add note
        try {
            // eslint-disable-next-line
            const response = await fetch(`${host}/api/notes/AddNote`, {
                method: "POST",
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": "application/json",
                    "auth-token": authToken
                },
                body: JSON.stringify({
                    "title": title,
                    "description": description,
                    "tag": tag
                }),
            });
            const note = response.json();
            setNotes(notes.concat(note));
            getNotes();

        } catch (error) {
            console.error(error.message);
        }

    }
    // Edit a note
    const editNote = async (id, title, description, tag) => {
        // API call to edit the data
        //const url = host + "api/notes/UpdateNote/678fbc244c8a21bc1c1d03a0";
        try {
            const response = await fetch(`${host}/api/notes/UpdateNote/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken
                },
                body: JSON.stringify({
                    "title": title,
                    "description": description,
                    "tag": tag
                }),
            });
            const json = response.json();

        } catch (error) {
            console.error(error.message);
        }
        let newNote = JSON.parse(JSON.stringify(notes));
        // Logic to edit in client
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }

        }
        setNotes(newNote);
    }
    // Delete a note
    const deleteNote = async (id) => {

        const newNotes = notes.filter((note) => { return note._id === id });
        setNotes(newNotes);
        try {
            const response = await fetch(`${host}/api/notes/DeleteNote/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken
                }

            });
            getNotes();
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState