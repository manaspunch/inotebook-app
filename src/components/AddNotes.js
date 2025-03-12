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
    }
    return (
        <div className='container'>
            <h2>Add note</h2>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" onChange={handleOnChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" name="tag" onChange={handleOnChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" name='description' rows="3" onChange={handleOnChange}></textarea>
            </div>

            <input className="btn btn-primary" type="submit" value="Add note" onClick={handleSubmit}></input>
        </div>
    )
}

export default AddNotes
