import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const pages = [
  { path: '/', name: 'Home' },
  { path: '/writing', name: 'Writing' },
  { path: '/art', name: 'Art' },
  { path: '/about', name: 'About' },
  { path: '/names', name: 'Names' },
  { path: '/resist', name: 'Resist' },
  { path: '/dance', name: 'Dance' },
  { path: '/random', name: 'Random' },
  { path: '/nonexistent-page', name: '404' },
]

test.describe('Accessibility (WCAG 2.1 AA)', () => {
  for (const { path, name } of pages) {
    test(`${name} page has no automatically detectable violations`, async ({
      page,
    }) => {
      await page.goto(path)
      await page.locator('h1').first().waitFor()
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()

      expect(results.violations).toEqual([])
    })
  }
})
