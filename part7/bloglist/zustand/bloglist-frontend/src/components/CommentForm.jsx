import { Box, Button, TextField } from '@mui/material'
import { useField } from '../hooks'

const CommentForm = ({ addComment }) => {
  const comment = useField('text')

  const handleSubmit = async event => {
    event.preventDefault()

    const text = comment.inputProps.value.trim()
    if (!text) {
      return
    }

    const added = await addComment(text)
    if (added) {
      comment.reset()
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', gap: 1, alignItems: 'center', my: 1 }}
    >
      <TextField
        {...comment.inputProps}
        size="small"
        placeholder="add a comment"
        slotProps={{ htmlInput: { 'data-testid': 'comment-input' } }}
      />
      <Button type="submit" variant="contained" data-testid="add-comment">
        add comment
      </Button>
    </Box>
  )
}

export default CommentForm
