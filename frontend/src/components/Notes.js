import React from 'react'


const NoteItem = ({note}) => {
    return (
        <tr>
            <td>{note.project}</td>
            <td>{note.user}</td>
            <td>{note.text}</td>
            <td>{note.created}</td>
            <td>{note.updated}</td>
            <td>{note.isActive.toString()}</td>
        </tr>
    )
}


const NoteList = ({notes}) => {
    return (
        <>
            <h1>Notes list</h1>
            <table>
                <tr>
                    <th>Project</th>
                    <th>User</th>
                    <th>Text</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Is active</th>
                </tr>
                {notes.map((note) => <NoteItem note={note}/>)}
            </table>
        </>
    )
}


export default NoteList