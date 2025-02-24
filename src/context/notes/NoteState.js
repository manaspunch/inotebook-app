import React, { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {

    const noteInitial =
        [
            {
                "_id": "678f8e4bca65ab7e66cedc98",
                "user": "6789226478c7e0788d5090d4",
                "title": "The 2nd Elizabeth",
                "description": "The book is very good",
                "tag": "Novel",
                "date": "2025-01-21T12:08:43.113Z",
                "__v": 0
            },
            {
                "_id": "678f8e4bca65ab7e66cedc9a",
                "user": "6789226478c7e0788d5090d4",
                "title": "The 2nd Elizabeth",
                "description": "The book is very good",
                "tag": "Novel",
                "date": "2025-01-21T12:08:43.866Z",
                "__v": 0
            },
            {
                "_id": "678f8f8929aab13eaeed5ac97",
                "user": "6789226478c7e0788d5090d4",
                "title": "The Ramayan Version",
                "description": "The book is very good for people",
                "tag": "Novel",
                "date": "2025-01-21T12:14:01.670Z",
                "__v": 0
            },
            {
                "_id": "678f8e74bca65ab7e66cedc9a",
                "user": "6789226478c7e0788d5090d4",
                "title": "The 2nd Elizabeth",
                "description": "The book is very good",
                "tag": "Novel",
                "date": "2025-01-21T12:08:43.866Z",
                "__v": 0
            },
            {
                "_id": "678f8f89129aab3eaeed5ac97",
                "user": "6789226478c7e0788d5090d4",
                "title": "The Ramayan Version",
                "description": "The book is very good for people",
                "tag": "Novel",
                "date": "2025-01-21T12:14:01.670Z",
                "__v": 0
            },
            {
                "_id": "678f8e4bc2a65ab7e66cedc9a",
                "user": "6789226478c7e0788d5090d4",
                "title": "The 2nd Elizabeth",
                "description": "The book is very good",
                "tag": "Novel",
                "date": "2025-01-21T12:08:43.866Z",
                "__v": 0
            },
            {
                "_id": "678f8f8929aa4b3eaeed5ac97",
                "user": "6789226478c7e0788d5090d4",
                "title": "The Ramayan Version",
                "description": "The book is very good for people",
                "tag": "Novel",
                "date": "2025-01-21T12:14:01.670Z",
                "__v": 0
            }
        ]
    const [notes, setNotes] = useState(noteInitial)

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState