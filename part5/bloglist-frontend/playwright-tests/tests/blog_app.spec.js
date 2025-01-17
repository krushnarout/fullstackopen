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
})
