import React from 'react';
import './AddNote.css';
import ApiContext from '../ApiContext';
import config from '../config';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';


import '../NoteListNav/NoteListNav.css'

class AddNote extends React.Component {
    static contextType = ApiContext;

    constructor(props) {
        super(props)
        this.state = {
            name: {
                value: '',
                touched: false,
            },
            content: {
                value: '',
                touched: false,
            }
        }
        this.name = React.createRef();
        this.content= React.createRef();
    }

    updateNoteName(name) {
        this.setState({ 
            name: { value: name, touched: true} 
        })
    }

    updateNoteContent(content) {
        this.setState({ 
            content: { value: content, touched: true} 
        })
    }

    handleClickAddNote = (event) => {
        event.preventDefault()

        let noteName = event.target.name.value
        let noteContent= event.target.content.value
        let selectedFolder = event.target['folder-name'].value
        let newNote = JSON.stringify({
            name: noteName,
            modified: new Date(),
            folderId: selectedFolder,
            content: noteContent   
        })

        fetch(`${config.API_ENDPOINT}/notes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: newNote
        })
        .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
        .then(res => {
            this.context.addNote(res)
            this.props.history.push('/')
        })
        .catch(error => {
            console.error({ error })
          })
    }

    validateNoteName() {
        const newNoteName = this.state.name.value.trim();
        if(newNoteName.length < 1) {
            return 'Your note needs a name!'
        }
    }

    validateNoteContent() {
        const updateNoteContent = this.state.content.value.trim();
        if (updateNoteContent.length < 3) {
            return 'Lets give this note a little more content! At least 3 characters will do!'
        }
    }

    render(){
        console.log(this.props)
        const { folders=[] } = this.context
        const nameError = this.validateNoteName();
        const contentError = this.validateNoteContent();

        return(
           
            <form className="add-note-form" onSubmit={e => this.handleClickAddNote(e)}>
                <h2>Create a Note</h2>
                <div className="note-form">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        aria-required="true"
                        aria-describedby="errorMessageName"
                        aria-label="Enter a note name"
                        ref={this.name}
                        onChange={e => this.updateNoteName(e.target.value)}
                    />
                    <div id="errorMessageName">
                    {this.state.name.touched && <ValidationError message={nameError} />}
                    </div>
                    <label htmlFor="content">Content</label>
                    <textarea
                        type="text"
                        name="content"
                        id="content" 
                        aria-required="true"
                        aria-describedby="errorMessageContent"
                        aria-label="Enter some content for your note"
                        ref={this.content}
                        onChange={e => this.updateNoteContent(e.target.value)} 
                    />
                    <div id="errorMessageContent">
                    {this.state.content.touched && <ValidationError message={contentError} />}
                    </div>
                    <label htmlFor="folder-name">Folder</label>
                    <select name="folder-name" id="folder-name">
                        <option value="...">...</option>
                        {folders.map(folder =>
                        <option key={folder.id} name={folder.id} value={folder.id}>{folder.name}</option>)}
                    </select>
                    <div className="add-button">
                        <button 
                            type="submit"
                            disabled={
                                this.validateNoteName() ||
                                this.validateNoteContent()
                            }
                            >Add Note</button>

                    </div>
                </div>
            </form>
        )
    }
}


export default AddNote


AddNote.propTypes = {
    history: PropTypes.object
}