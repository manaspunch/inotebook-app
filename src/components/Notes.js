import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';
import { useNavigate } from "react-router-dom";

function Notes(props) {
    const context = useContext(noteContext);
    const navigate = useNavigate();
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const handleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }


    useEffect(() => {
        if (localStorage.getItem("token")) {
            // eslint-disable-next-line
            getNotes();
        } else { navigate('/login'); }
    }, [])

    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });

    }
    const handleUpdateNote = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("The note updated successfuly.", "success");
    }
    const ref = useRef(null);
    const refClose = useRef(null);
    return (
        <>
            <AddNotes showAlert={props.showAlert} />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">

            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={handleOnChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="etag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleOnChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <textarea className="form-control" id="edescription" name='edescription' value={note.edescription} rows="3" onChange={handleOnChange}></textarea>
                            </div>

                            {/* <input className="btn btn-primary" type="submit" value="Add note" onClick={handleSubmit}></input> */}
                        </div>

                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleUpdateNote}>Update note</button>
                        </div>
                    </div>
                </div>
            </div >
            <div className='row my-3'>
                <h2>Your notes</h2>
                <div className="container">
                    {notes.length === 0 && 'No notes to display now..!'}
                </div>

                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />;
                })}

            </div>
        </>
    )

}

export default Notes
