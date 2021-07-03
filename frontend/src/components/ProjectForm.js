import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {title: '', link: '', users: props.users}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createProject(this.state.title, this.state.link, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="title">title</label>
                    <input type="text" className="form-control" name="title" value={this.state.title}
                           onChange={(event) => this.handleChange(event)}/>

                    <label for="link">link</label>
                    <input type="text" className="form-control" name="link" value={this.state.link}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label for="users">users</label>
                    <select name="users" className='form-control' onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((item) => <option value={item}>{item.username}</option>)}
                    </select>
                </div>

                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default ProjectForm

