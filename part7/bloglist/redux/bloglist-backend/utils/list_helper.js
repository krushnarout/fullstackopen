const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}

  return blogs.reduce((prev, curr) =>
    curr.likes > prev.likes ? curr : prev
  )
}

const mostBlogs = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author')
  const authorBlogCounts = _.map(blogsByAuthor, (blogs, author) => ({
    author,
    blogs: blogs.length,
  }))

  return _.maxBy(authorBlogCounts, 'blogs')
}

const mostLikes = (blogs) => {
  const likesByAuthor = _.groupBy(blogs, 'author')
  const authorLikes = _.map(likesByAuthor, (blogs, author) => ({
    author,
    likes: blogs.reduce((sum, blog) => sum + blog.likes, 0),
  }))

  return _.maxBy(authorLikes, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}