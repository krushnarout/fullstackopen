const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    ;(await request.post('/api/users', {
      data: {
        name: 'Krushna Kanta Rout',
        username: 'krushnarout',
        password: 'password',
      },
    }),
      await request.post('/api/users', {
        data: {
          name: 'Krushna Rout',
          username: 'krushnarout2',
          password: 'password',
        },
      }))

    await page.goto('')
  })

  test('Login form is shown', async ({ page }) => {
    const loginForm = page.locator('form')
    await expect(loginForm).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'krushnarout', 'password')
      await expect(page.getByText('krushnarout logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'krushnarout', 'wrong')
      const errorDiv = page.locator('.error')
      await expect(errorDiv).toBeVisible()
      await expect(errorDiv).toHaveText('Wrong username or password')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
      await loginWith(page, 'krushnarout', 'password')
      await createBlog(page, {
        title: 'My First Blog',
        author: 'Krushna Kanta Rout',
        url: 'https://myblog.com',
      })
    })

    test('a new blog can be created', async ({ page }) => {
      const blogTitle = page.locator('.blog').filter({
        hasText: 'My First Blog Krushna Kanta Rout',
      })
      await expect(blogTitle).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      const blog = page.locator('.blog').filter({
        hasText: 'My First Blog Krushna Kanta Rout',
      })

      await blog.getByRole('button', { name: 'View' }).click()
      const likeButton = blog.getByTestId('like-button')
      const likes = blog.getByTestId('likes')
      const initialLikes = Number(await likes.innerText())
      await likeButton.click()
      await expect(likes).toHaveText(String(initialLikes + 1))
    })

    test('the user who created a blog can delete it', async ({ page }) => {
      const blog = page.locator('.blog').filter({
        hasText: 'My First Blog Krushna Kanta Rout',
      })

      await blog.getByRole('button', { name: 'View' }).click()
      page.on('dialog', dialog => dialog.accept())
      await blog.getByRole('button', { name: 'Remove' }).click()
      await expect(blog).not.toBeVisible()
    })

    test('only the user who added the blog sees the delete button', async ({
      page,
      request,
    }) => {
      const blog = page.locator('.blog').filter({
        hasText: 'My First Blog Krushna Kanta Rout',
      })

      await blog.getByRole('button', { name: 'View' }).click()
      const deleteButton = blog.getByRole('button', { name: 'Remove' })
      await expect(deleteButton).toBeVisible()

      await page.getByRole('button', { name: 'Logout' }).click()
      await loginWith(page, 'krushnarout2', 'password')

      await blog.getByRole('button', { name: 'View' }).click()
      await expect(deleteButton).not.toBeVisible()
    })

    test('blogs are arranged in the order of most likes first', async ({
      page,
    }) => {
      await page.getByRole('button', { name: 'cancel' }).click()
      await createBlog(page, {
        title: '2 Likes Blog',
        author: 'krushnarout',
        url: 'https://github.com/krushnarout/fullstackopen',
      })

      await page.getByRole('button', { name: 'cancel' }).click()
      await createBlog(page, {
        title: '5 Likes Blog',
        author: 'krushnarout',
        url: 'https://github.com/krushnarout/fullstackopen',
      })

      const likeBlog = async (blogTitle, times) => {
        const blog = page.locator('.blog').filter({ hasText: blogTitle })
        await blog.getByRole('button', { name: 'View' }).click()
        const likeButton = blog.getByTestId('like-button')

        for (let i = 0; i < times; i++) {
          await likeButton.click()
          await page.waitForTimeout(200)
        }
      }

      await likeBlog('5 Likes Blog', 5)
      await likeBlog('2 Likes Blog', 2)

      const blogTitles = await page.locator('.blog').allTextContents()

      expect(blogTitles).toHaveLength(3)
      expect(blogTitles[0]).toContain('5 Likes Blog')
      expect(blogTitles[1]).toContain('2 Likes Blog')
      expect(blogTitles[2]).toContain('My First Blog')
    })
  })
})
