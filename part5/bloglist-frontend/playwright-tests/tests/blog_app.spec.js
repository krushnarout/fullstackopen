const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith } = require('./helper')

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
    beforeEach(async ({ page }) => {
      await loginWith(page, 'krushnarout', 'password')
    })

    test('a new blog can be created', async ({ page }) => {
      const newBlogButton = page.getByText('New Blog')
      await newBlogButton.click()

      await page.fill('input[name="title"]', 'My First Blog')
      await page.fill('input[name="author"]', 'Krushna Kanta Rout')
      await page.fill('input[name="url"]', 'https://myblog.com')

      const createButton = page.getByText('Create')
      await createButton.click()

      const blogList = page.locator('.blog-list')
      await expect(blogList).toContainText('My First Blog')
      await expect(blogList).toContainText('Krushna Kanta Rout')
    })
  })
})
