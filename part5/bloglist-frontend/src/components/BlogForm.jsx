import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
        title
          <input
            type="text"
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
          />
        </div>
        <div>
        author
          <input
            type="text"
            value={newAuthor}
            onChange={event => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
        url
          <input
            type="text"
            value={newUrl}
            onChange={event => setNewUrl(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
