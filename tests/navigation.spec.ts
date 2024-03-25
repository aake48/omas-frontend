import { test, expect } from '@playwright/test';
import { headerLinks } from '@/lib/links';

const headerLinks2 = [
  ...headerLinks,
  {
    href: "/",
    text: "Etusivu",
  },
  {
    href: "/rekisteroidy",
    text: "Rekisteröidy",
  },
  {
    href: "/kirjaudu",
    text: "Kirjaudu",
  },
]

/**
 * test if navigates to header links
 */
test.describe('navigation', () => {
  headerLinks2.forEach(async link => {
    test(`page is ${link.text}`, async ({ page }) => {
      await page.goto(link.href);
      await expect(page.getByRole('heading', { name: '404' })).toBeHidden();
    })
  })
})