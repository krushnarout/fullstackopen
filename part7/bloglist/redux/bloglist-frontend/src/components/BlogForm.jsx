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
      url: newUrl,
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
            data-testid="title"
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
            placeholder="enter title here"
          />
        </div>
        <div>
          author
          <input
            type="text"
            data-testid="author"
            value={newAuthor}
            onChange={event => setNewAuthor(event.target.value)}
            placeholder="enter author here"
          />
        </div>
        <div>
          url
          <input
            type="text"
            data-testid="url"
            value={newUrl}
            onChange={event => setNewUrl(event.target.value)}
            placeholder="enter url here"
          />
        </div>
        <button type="submit" data-testid="create">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
