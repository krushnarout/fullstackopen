import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author, but not URL or likes by default', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Krushna Rout',
    url: 'https://github.com/krushnarout',
    likes: 50,
    user: {
      username: 'kruhnarout',
      id: '12345'
    }
  }
  
  render(<Blog blog={blog} />)

  const titleElement = screen.getByText('Test Blog Title Krushna Rout')
  expect(titleElement).toBeDefined()
  const urlElement = screen.queryByText('https://github.com/krushnarout')
  expect(urlElement).toBeNull()
  const likesElement = screen.queryByText('likes: 50')
  expect(likesElement).toBeNull()
})
