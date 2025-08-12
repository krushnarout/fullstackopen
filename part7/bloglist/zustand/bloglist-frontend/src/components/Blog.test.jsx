import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Blog from './Blog'

const { likeHandler } = vi.hoisted(() => ({ likeHandler: vi.fn() }))

// Blog reads the like action straight from the blog store, so the store
// module is mocked instead of passing a handler in as a prop
vi.mock('../stores/blogStore', () => ({
  default: selector => selector({ likeBlog: likeHandler }),
}))

describe('<Blog />', () => {
  let container
  const blog = {
    title: 'Test Blog Title',
    author: 'Krushna Rout',
    url: 'https://github.com/krushnarout',
    likes: 50,
    user: {
      username: 'kruhnarout',
      id: '12345',
    },
  }

  beforeEach(() => {
    likeHandler.mockClear()
    container = render(
      <MemoryRouter>
        <Blog blog={blog} />
      </MemoryRouter>
    ).container
  })

  test('renders title and author, but not URL or likes by default', () => {
    const titleElement = screen.getByText('Test Blog Title Krushna Rout')
    expect(titleElement).toBeDefined()
    const urlElement = screen.queryByText('https://github.com/krushnarout')
    expect(urlElement).toBeNull()
    const likesElement = screen.queryByTestId('likes')
    expect(likesElement).toBeNull()
  })

  test('displays url and likes after view button click', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)
    const urlElement = screen.getByText('https://github.com/krushnarout')
    expect(urlElement).toBeDefined()
    const likesElement = screen.getByTestId('likes')
    expect(likesElement).toHaveTextContent('50')
  })

  test('like button event handler called twice when clicked twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})
