import React from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'

export default class AddNote extends React.Component {
  
  static contextType = ApiContext

  render() {
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
            <select id='note-select'>
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