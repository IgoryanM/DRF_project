import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Cookies from 'universal-cookie';

import Navibar from './components/Navibar.js';
import Footer from './components/Footer';
import ProjectTable from "./components/Project";
import UserList from './components/Users.js';
import ProjectList from './components/Projects';
import NoteList from "./components/Notes";
import LoginForm from './components/Auth.js';
import ProjectForm from "./components/ProjectForm";


const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'notes': [],
            'token': '',
        }
        this.is_authenticated = this.is_authenticated.bind(this)
        this.logout = this.logout.bind(this)

    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    is_authenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()

        axios.get('http://127.0.0.1:8000/api/v1/users', {headers})
            .then(response => {
                const users = response.data.results
                this.setState({'users': users})
            }).catch(error => {
            console.log(error)
            this.setState({users: []})
        })

        axios.get('http://127.0.0.1:8000/api/v1/projects', {headers})
            .then(response => {
                const projects = response.data.results
                this.setState({'projects': projects})
            }).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })

        axios.get('http://127.0.0.1:8000/api/v1/notes', {headers})
            .then(response => {
                const notes = response.data.results
                this.setState({'notes': notes})
            }).catch(error => {
            console.log(error)
            this.setState({notes: []})
        })
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/v1/projects/${id}`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
            }).catch(error => console.log(error))
    }

    createProject(title, link, users) {
        const headers = this.get_headers()
        const data = {title: title, link: link, users: users[0].id}
        console.log(data)
        axios.post(`http://127.0.0.1:8000/api/v1/projects/`, data, {headers})
            .then(response => {
                let new_project = response.data
                console.log(new_project)
                const user = this.state.projects.filter((item) => item.id === new_project.id)[0]
                new_project.users = user
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }

    deleteNote(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/v1/notes/${id}`, {headers})
            .then(response => {
                this.setState({projects: this.state.notes.filter((item) => item.id !== id)})
            }).catch(error => console.log(error))
    }

    createNote(text, is_active, project, user) {
        const headers = this.get_headers()
        const data = {text: text, is_active: is_active, project: project, user: user}
        axios.post(`http://127.0.0.1:8000/api/v1/projects/`, data, {headers})
            .then(response => {
                let new_note = response.data
                const user = this.state.notes.filter((item) => item.id === new_note.id)[0]
                new_note.user = user
                this.setState({notes: [...this.state.notes, new_note]})
            }).catch(error => console.log(error))
    }


    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Navibar is_authenticated={this.is_authenticated} logout={this.logout}/>
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}
                                                                                    deleteProject={(id) => this.deleteProject(id)}/>}/>
                        <Route exact path='/notes' component={() => <NoteList notes={this.state.notes}
                                                                                    deleteNote={(id) => this.deleteNote(id)}/>}/>
                        <Route exact path='/projects/create' component={() => <ProjectForm users={this.state.users}
                                                                                           createProject={(title, link, users) => this.createProject(title, link, users)}/>}/>
                        <Route exact path='/notes/create' component={() => <NoteList notes={this.state.notes}/>}/>
                        <Route path='/projects/project/:id'> <ProjectTable projects={this.state.projects}/> </Route>
                        <Route exact path='/login' component={() => <LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>
                        <Route component={NotFound404}/>
                    </Switch>
                    <Footer/>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
