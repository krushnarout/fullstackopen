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
    <form onSubmit={handleSubmit}>
      <input
        {...comment.inputProps}
        data-testid="comment-input"
        placeholder="add a comment"
      />
      <button type="submit" data-testid="add-comment">
        add comment
      </button>
    </form>
  )
}

export default CommentForm
