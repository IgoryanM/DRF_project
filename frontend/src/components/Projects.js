import React from 'react'
import {Link} from 'react-router-dom'


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td><Link to={`projects/project/${project.id}`}>{project.title}</Link></td>
            <td>{project.link}</td>
            <td>{project.users}</td>
            <td><button onClick={()=>deleteProject(project.id)} type='button'>Delete</button></td>
        </tr>
    )
}


const ProjectList = ({projects, deleteProject}) => {
    return (
        <>
            <h1>Projects list</h1>
            <table>
                <tr>
                    <th>Title</th>
                    <th>Link</th>
                    <th>Users</th>
                    <th></th>
                </tr>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
            </table>
            <Link to='/projects/create'>Create</Link>
        </>
    )
}


export default ProjectList