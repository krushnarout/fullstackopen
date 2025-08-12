import { create } from 'zustand'
import blogService from '../services/blogs'

const useBlogStore = create(set => ({
  blogs: [],

  initializeBlogs: async () => {
    const blogs = await blogService.getAll()
    set({ blogs })
  },

  createBlog: async (blog, user) => {
    const createdBlog = await blogService.create(blog)
    // the backend returns the new blog with an unpopulated user field,
    // so the logged in user is attached here for rendering
    const blogWithUser = {
      ...createdBlog,
      user: {
        username: user.username,
        name: user.name,
        id: user.id,
      },
    }
    set(state => ({ blogs: state.blogs.concat(blogWithUser) }))
    return createdBlog
  },

  updateBlog: updatedBlog => {
    set(state => ({
      blogs: state.blogs.map(blog =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      ),
    }))
  },

  removeBlog: id => {
    set(state => ({ blogs: state.blogs.filter(blog => blog.id !== id) }))
  },
}))

export default useBlogStore
