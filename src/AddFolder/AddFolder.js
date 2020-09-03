import React from 'react'
import ApiContext from '../ApiContext'
import NotefulForm from '../NotefulForm/NotefulForm'
import config from '../config'

export default class AddFolder extends React.Component {
    static defaultProps = {
        history: {
            push: () => { }
        }

    }
    
    static contextType = ApiContext;

    handleSubmit = event => {
        event.preventDefault()
        const folder = {name: event.target.folderName.value}

        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folder),
        })
        .then(response => {
            if (!response.ok)
                return response.json().then(event => Promise.reject(event))
            return response.json()
        })
        .then(folder => {
            this.context.addFolder(folder)
            this.props.history.push('/')
        })
        .catch(error => {
            console.error({error})
        })
    }

    render() {
        return (
            <section className="AddFolder">
                <h2>Create A Folder</h2>
                <NotefulForm onSubmit={this.handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="folder-name-input">Name</label>
                        <input type="text" id="folder-name-input" name='folderName' />
                    </div>
                    <button type="submit">Add Folder</button>
                </NotefulForm>
            </section>
        )
    }

}

