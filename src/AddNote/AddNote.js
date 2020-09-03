import React from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import ValidationError from '../ValidationError'

export default class AddNote extends React.Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  
  static contextType = ApiContext

  handleSubmit = event => {
    event.preventDefault()
    const newNote = {
      name: event.target.noteName.value,
      content: event.target.noteContent.value,
      folderId: event.target.noteFolderId.value,
      modified: new Date(),
    }

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
    .then(response => {
      if (!response.ok)
        return response.json().then(event => Promise.reject(event))
      return response.json()
    })
    .then(note => {
      this.context.addNote(note)
      this.props.history.push(`/folder/${note.folderId}`)
    })
    .catch(error => {
      console.error({error})
    })
  }

  validateNote() {
    const name = this.context.name.value.trim();
    if (name.length === 0) {
      return "name is required";
    } else if (name.length < 3) {
      return "name must be at least 3 characters long"
    }
  }

  render() {
    const noteNameError = this.validateNote();
    const { folders = [] } = this.context;
    return (
      <section className="addNote">
        <h2>
          Create a note
        </h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='form-field'>
            <label htmlFor='note-name-input'>
              note
            </label>
            <select id='note-select' name="noteFolderId">
              <option value={null}>Folders</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>{folder.name}
                </option>
              )}
            </select>
            <label htmlFor='note-name'>
              name
            <input id='note-name' type='text' name="noteName" />
            </label>
            <label htmlFor='note-content-input'>
              content
              <textarea id="content" type='text' name="noteContent"></textarea>
            </label>
          </div>
          <button type='submit'>add note</button>
        </NotefulForm>
      </section>
    )
  }
}