import React from 'react';
import './AddFolder.css';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';
import config from '../config';


import '../NoteListNav/NoteListNav.css'


class AddFolder extends React.Component {
    static contextType = ApiContext;

    constructor(props) {
        super(props)
        this.state = {
            name: {
                value: '',
                touched: false,
            }   
        }
        this.name = React.createRef();
    }

    updateFolderName(name) {
        this.setState({ 
            name: { value: name, touched: true} 
        })
    }

    handleClickAddFolder = (event) => {
        event.preventDefault()
        let folderName = event.target.name.value
        let newFolder = JSON.stringify({
            name: folderName
        })

        fetch(`${config.API_ENDPOINT}/folders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: newFolder
        })
        .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
        .then(res => {
            this.context.addFolder(res)
            this.props.history.push('/')
        })
        .catch(error => {
            console.error({ error })
          })
    }

    validateFolderName() {
        const newFolderName = this.state.name.value.trim();
        if(newFolderName.length < 1) {
            return 'Your folder needs a name!'
        }
    }
    

    render() {
        const nameError = this.validateFolderName();

        return (
           
            <form className="add-folder-form" onSubmit={e => this.handleClickAddFolder(e)}>
                <h2>Create a folder</h2>
                <div className="folder-form">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        aria-required="true"
                        aria-describedby="errorMessage"
                        aria-label="Enter a new folder name"
                        ref={this.name}
                        onChange={e => this.updateFolderName(e.target.value)}
                    />
                    <div id="errorMessage">
                    {this.state.name.touched && <ValidationError message={nameError} />}
                    </div>
                    <div className="add-button">
                        <button 
                        type="submit"
                        disabled={
                            this.validateFolderName()
                        }>
                            Add Folder</button>
                    </div>
                </div>
            </form>
        )
    }
}


export default AddFolder


AddFolder.propTypes = {
    history: PropTypes.object
}