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
      await expect(page.getByRole('heading', { name: title })).toBeVisible();
    })
  })
});

/**
 * test if page loads competitions under future container
 */
test('future container has children = data', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'kesan_ampujaiset' })).toBeVisible();
});

/**
 * test if page loads competitions under past container
 */
test('past container has children = data', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'kesan_ampujaiset' })).toBeVisible();
});