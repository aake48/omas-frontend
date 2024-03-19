import { test, expect } from '@playwright/test';

const titles = [
  "Sarjakilpailukausi",
  "Tulevat kilpailut",
  "Viimeisimmät tulokset"
];

/**
 * test if page loads season + future and past competition containers
 */
test.describe('has containers for season + future and past competitions', () => {
  titles.forEach(title => {
    test(`has ${title} container`, async ({ page }) => {
      await page.goto('/');

      const container = page.locator('div', {
        has: page.getByRole('heading', { name: title, exact: true })
      }).nth(0);

      await expect(container).toBeVisible();
    })
  })
});

/**
 * test if page loads competitions under future container
 */
test('future container has children = data', async ({ page }) => {
  await page.goto('/');
  
});

/**
 * test if page loads competitions under past container
 */
test('past container has children = data', async ({ page }) => {
  await page.goto('/');
  
});