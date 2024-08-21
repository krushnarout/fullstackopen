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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}