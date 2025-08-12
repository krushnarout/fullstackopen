import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls createBlog with correct details when a new blog is created', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('enter title here')
    const authorInput = screen.getByPlaceholderText('enter author here')
    const urlInput = screen.getByPlaceholderText('enter url here')
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'Test Blog Title')
    await user.type(authorInput, 'Krushna Author')
    await user.type(urlInput, 'https://github.com/krushnarout')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'Test Blog Title',
      author: 'Krushna Author',
      url: 'https://github.com/krushnarout',
    })
  })
})
