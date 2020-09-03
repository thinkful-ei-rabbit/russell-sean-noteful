import React from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
// import ApiContext from '../ApiContext'

export default class AddNote extends React.Component {
  static defaultProps = {
    folders: [],
  }

  render() {
    const { folder = [] } = this.context;
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
              <option value={null}>...</option>
              {folder.map(folder =>
                <option key={folder.id} value={folder.id}>{folder.name}
                </option>
              )}
            </select>
            <input id='note-select' type='text'></input>
            <label htmlFor='note-content-input'>
              content
            </label>
            <textarea id="content" type='text'></textarea>
          </div>
          <button type='submit'>add note</button>
        </NotefulForm>
      </section>
    )
  }
}