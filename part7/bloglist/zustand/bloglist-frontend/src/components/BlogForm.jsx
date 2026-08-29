import { Box, Button, TextField } from '@mui/material'
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
    <Box component="form" onSubmit={addBlog} sx={{ maxWidth: 400, mb: 2 }}>
      <h2>Create new blog</h2>
      <TextField
        {...title.inputProps}
        label="title"
        placeholder="enter title here"
        margin="dense"
        fullWidth
        slotProps={{ htmlInput: { 'data-testid': 'title' } }}
      />
      <TextField
        {...author.inputProps}
        label="author"
        placeholder="enter author here"
        margin="dense"
        fullWidth
        slotProps={{ htmlInput: { 'data-testid': 'author' } }}
      />
      <TextField
        {...url.inputProps}
        label="url"
        placeholder="enter url here"
        margin="dense"
        fullWidth
        slotProps={{ htmlInput: { 'data-testid': 'url' } }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 1 }}
        data-testid="create"
      >
        create
      </Button>
    </Box>
  )
}

export default BlogForm
