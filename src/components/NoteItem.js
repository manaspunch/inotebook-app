import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <div className='col-md-3'>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title col-md-3" style={{ width: '18rem' }}> {note.title}</h5>
                    <i className="fa-sharp-duotone fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id) }}></i>
                    <i className="fa-sharp-duotone fa-regular fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                    <br></br>
                    <p className="card-text"> {note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default NoteItem
