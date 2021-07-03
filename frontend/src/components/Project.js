import React from 'react'
import {useParams} from 'react-router-dom'

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.title}</td>
            <td>{project.link}</td>
            <td>{project.users}</td>
        </tr>
    )
}


const ProjectTable = ({projects}) => {

    let {id} = useParams();
    let filtered_items = projects.filter((project) => project.id == id)
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Link</th>
                <th>Users</th>
            </tr>
            {filtered_items.map((project) => <ProjectItem project={project}/>)}
        </table>
    )
}

export default ProjectTable