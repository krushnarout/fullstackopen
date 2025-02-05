const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Krushna Kanta Rout',
        username: 'krushnarout',
        password: 'password'
      }
    })

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
        url: 'https://myblog.com'
      })
    })

    test('a new blog can be created', async ({ page }) => {
      const blogTitle = page.locator('.blog').filter({
        hasText: 'My First Blog Krushna Kanta Rout'
      })
      await expect(blogTitle).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      const blog = page.locator('.blog').filter({
        hasText: 'My First Blog Krushna Kanta Rout'
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
        hasText: 'My First Blog Krushna Kanta Rout'
      })

      await blog.getByRole('button', { name: 'View' }).click()
      page.on('dialog', dialog => dialog.accept())
      await blog.getByRole('button', { name: 'Remove' }).click()
      await expect(blog).not.toBeVisible()
    })
  })
})
