import React from 'react'
import ApiContext from '../ApiContext'
import NotefulForm from '../NotefulForm/NotefulForm'
import config from '../config'

export default class AddFolder extends React.Component {
    static defaultProps = {

    }

    static contextType = ApiContext;

    handleSubmit = e => {
        e.preventDefault()
        const folder = {name: e.target.val()}

        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folder),
        })
    }

    render() {
        return (
            <section className="AddFolder">
                <h2>Create A Folder</h2>
                <NotefulForm onSubmit={this.handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="folder-name-input">Name</label>
                        <input type="text" id="folder-name-input" name='folder-name' />
                    </div>
                    <button type="submit">Add Folder</button>
                </NotefulForm>
            </section>
        )
    }

}