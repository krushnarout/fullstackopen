import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

  const likeHandler = vi.fn()

  beforeEach(() => {
    container = render(<Blog blog={blog} updateBlog={likeHandler} />).container
  })

  test('renders title and author, but not URL or likes by default', () => {
    const titleElement = screen.getByText('Test Blog Title Krushna Rout')
    expect(titleElement).toBeDefined()
    const urlElement = screen.queryByText('https://github.com/krushnarout')
    expect(urlElement).toBeNull()
    const likesElement = screen.queryByText('likes: 50')
    expect(likesElement).toBeNull()
  })

  test('displays url and likes after view button click', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)
    const urlElement = screen.getByText('https://github.com/krushnarout')
    expect(urlElement).toBeDefined()
    const likesElement = screen.getByText('likes: 50')
    expect(likesElement).toBeDefined()
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
