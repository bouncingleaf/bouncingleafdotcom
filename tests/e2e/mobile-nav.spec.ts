import { test, expect } from '@playwright/test'

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('Mobile menu button toggles menu visibility', async ({ page }) => {
    await page.goto('/')

    const menuButton = page.locator('button[aria-label="Toggle menu"]')
    const mobileMenu = page.locator('.md\\:hidden.pb-4')

    await expect(menuButton).toBeVisible()
    await expect(mobileMenu).not.toBeVisible()

    await menuButton.click()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    await expect(mobileMenu).toBeVisible()

    await menuButton.click()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    await expect(mobileMenu).not.toBeVisible()
  })

  test('Mobile menu links navigate correctly', async ({ page }) => {
    await page.goto('/')

    const menuButton = page.locator('button[aria-label="Toggle menu"]')

    await menuButton.click()
    await page.click('.md\\:hidden.pb-4 >> text=Writing')
    await expect(page).toHaveURL('/writing')

    await menuButton.click()
    await page.click('.md\\:hidden.pb-4 >> text=Art')
    await expect(page).toHaveURL('/art')

    await menuButton.click()
    await page.click('.md\\:hidden.pb-4 >> text=About')
    await expect(page).toHaveURL('/about')
  })

  test('Mobile menu closes after clicking a link', async ({ page }) => {
    await page.goto('/')

    const menuButton = page.locator('button[aria-label="Toggle menu"]')
    const mobileMenu = page.locator('.md\\:hidden.pb-4')

    await menuButton.click()
    await expect(mobileMenu).toBeVisible()

    await page.click('.md\\:hidden.pb-4 >> text=Art')
    await expect(mobileMenu).not.toBeVisible()
  })
})
