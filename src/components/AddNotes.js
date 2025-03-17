import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext';

const AddNotes = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const handleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
    }
    return (
        <div className='container'>
            <h2>Add note</h2>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleOnChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleOnChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" name='description' value={note.description} rows="3" onChange={handleOnChange}></textarea>
            </div>

            <input disabled={note.title.length < 3 || note.description.length < 5} className="btn btn-primary" type="submit" value="Add note" onClick={handleSubmit}></input>
        </div>
    )
}

export default AddNotes
