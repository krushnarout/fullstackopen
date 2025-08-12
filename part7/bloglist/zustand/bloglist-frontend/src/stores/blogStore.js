import { create } from 'zustand'
import blogService from '../services/blogs'
import useUserStore from './userStore'

const useBlogStore = create(set => ({
  blogs: [],
  // lets a view tell "not fetched yet" apart from "fetched, but no match"
  initialized: false,

  initializeBlogs: async () => {
    const blogs = await blogService.getAll()
    set({ blogs, initialized: true })
  },

  createBlog: async blog => {
    const { user } = useUserStore.getState()
    const createdBlog = await blogService.create(blog)
    // the backend returns the new blog with an unpopulated user field,
    // so the signed in user is attached here for rendering
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

  likeBlog: async blog => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    })
    // the response populates the user without its id, so the blog's own
    // user object is kept to keep later likes and the remove button working
    set(state => ({
      blogs: state.blogs.map(b =>
        b.id === blog.id ? { ...updatedBlog, user: blog.user } : b
      ),
    }))
  },

  deleteBlog: async blog => {
    await blogService.remove(blog.id)
    set(state => ({ blogs: state.blogs.filter(b => b.id !== blog.id) }))
  },
}))

export default useBlogStore
