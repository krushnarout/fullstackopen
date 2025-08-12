import { useField } from '../hooks'

const BlogForm = ({ createBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: title.inputProps.value,
      author: author.inputProps.value,
      url: url.inputProps.value,
    })
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            {...title.inputProps}
            data-testid="title"
            placeholder="enter title here"
          />
        </div>
        <div>
          author
          <input
            {...author.inputProps}
            data-testid="author"
            placeholder="enter author here"
          />
        </div>
        <div>
          url
          <input
            {...url.inputProps}
            data-testid="url"
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
