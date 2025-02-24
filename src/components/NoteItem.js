import React from 'react'

const NoteItem = (props) => {
    const { note } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">

                <div className="card-body">

                    <div className="d-flex align-items-left">
                        <h5 className="card-title"> {note.title}</h5>
                        <i className="fa-sharp-duotone fa-solid fa-trash mx-2"></i>
                        <i className="fa-sharp-duotone fa-regular fa-pen-to-square mx-2"></i>

                        <p className="card-text mx-2"> {note.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
