import { test, expect } from '@playwright/test';
import { headerLinks } from '@/lib/links';

/**
 * test if navigates to header links
 */
test.describe('navigation', () => {
  headerLinks.forEach(async link => {
    test(`page is ${link.text}`, async ({ page }) => {
      await page.goto(link.href);
      await expect(page.getByRole('heading', { name: '404' })).toBeHidden();
    })
  })
})