import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('Home page loads with correct title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Leaf/)
    await expect(page.locator('header')).toBeVisible()
  })

  test('Can navigate to Writing page via header link', async ({ page }) => {
    await page.goto('/')
    await page.click('header >> text=Writing')
    await expect(page).toHaveURL('/writing')
    await expect(page.locator('h1')).toContainText('Writing')
  })

  test('Can navigate to Art page via header link', async ({ page }) => {
    await page.goto('/')
    await page.click('header >> text=Art')
    await expect(page).toHaveURL('/art')
    await expect(page.locator('h1')).toContainText('Art')
  })

  test('Can navigate to About page via header link', async ({ page }) => {
    await page.goto('/')
    await page.click('header >> text=About')
    await expect(page).toHaveURL('/about')
    await expect(page.locator('h1')).toContainText('About')
  })

  test('Can click site title to return home', async ({ page }) => {
    await page.goto('/about')
    await page.click("text=Leaf's art portfolio")
    await expect(page).toHaveURL('/')
  })

  test('404 page shows for unknown routes', async ({ page }) => {
    await page.goto('/nonexistent-page')
    await expect(page.locator('h1')).toContainText('404')
    await expect(page.locator('text=Page Not Found')).toBeVisible()
  })

  test('"Go Home" button on 404 works', async ({ page }) => {
    await page.goto('/nonexistent-page')
    await page.click('text=Go Home')
    await expect(page).toHaveURL('/')
  })
})
