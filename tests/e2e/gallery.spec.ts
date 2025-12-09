import { test, expect } from '@playwright/test'

test.describe('Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/art')
  })

  test('Art page loads with gallery sections', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Art')
    await expect(page.locator('h2:has-text("Artomat")')).toBeVisible()
    await expect(
      page.locator('h2:has-text("Thousands of Circles")')
    ).toBeVisible()
    await expect(
      page.locator('h2:has-text("Brooklyn Art Library")')
    ).toBeVisible()
  })

  test('Can expand/collapse gallery sections', async ({ page }) => {
    const circlesToggle = page.locator('text=Thousands of circles').first()
    const circlesGallery = page.locator(
      'section:has-text("Thousands of Circles") >> .grid'
    )

    await expect(circlesGallery).toBeVisible()

    await circlesToggle.click()
    await expect(circlesGallery).not.toBeVisible()

    await circlesToggle.click()
    await expect(circlesGallery).toBeVisible()
  })

  test('Can click image to open lightbox', async ({ page }) => {
    const galleryImage = page
      .locator('section:has-text("Thousands of Circles") >> .grid img')
      .first()
    await galleryImage.click()

    const lightbox = page.locator('.fixed.inset-0.bg-black')
    await expect(lightbox).toBeVisible()
  })

  test('Lightbox shows prev/next navigation for multiple images', async ({
    page,
  }) => {
    const galleryImage = page
      .locator('section:has-text("Thousands of Circles") >> .grid img')
      .first()
    await galleryImage.click()

    const prevButton = page.locator('button[aria-label="Previous image"]')
    const nextButton = page.locator('button[aria-label="Next image"]')

    await expect(prevButton).toBeVisible()
    await expect(nextButton).toBeVisible()

    const counter = page.locator('.fixed >> text=/\\d+ \\/ \\d+/')
    await expect(counter).toBeVisible()
    await expect(counter).toContainText('1 /')

    await nextButton.click()
    await expect(counter).toContainText('2 /')

    await prevButton.click()
    await expect(counter).toContainText('1 /')
  })

  test('Can close lightbox with close button', async ({ page }) => {
    const galleryImage = page
      .locator('section:has-text("Thousands of Circles") >> .grid img')
      .first()
    await galleryImage.click()

    const lightbox = page.locator('.fixed.inset-0.bg-black')
    await expect(lightbox).toBeVisible()

    const closeButton = page.locator('button[aria-label="Close lightbox"]')
    await closeButton.click()

    await expect(lightbox).not.toBeVisible()
  })

  test('Can close lightbox with Escape key', async ({ page }) => {
    const galleryImage = page
      .locator('section:has-text("Thousands of Circles") >> .grid img')
      .first()
    await galleryImage.click()

    const lightbox = page.locator('.fixed.inset-0.bg-black')
    await expect(lightbox).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(lightbox).not.toBeVisible()
  })

  test('Can navigate lightbox with arrow keys', async ({ page }) => {
    const galleryImage = page
      .locator('section:has-text("Thousands of Circles") >> .grid img')
      .first()
    await galleryImage.click()

    const counter = page.locator('.fixed >> text=/\\d+ \\/ \\d+/')
    await expect(counter).toContainText('1 /')

    await page.keyboard.press('ArrowRight')
    await expect(counter).toContainText('2 /')

    await page.keyboard.press('ArrowLeft')
    await expect(counter).toContainText('1 /')
  })
})
