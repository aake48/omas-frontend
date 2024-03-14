import { test, expect } from '@playwright/test';

/**
 * test if home page loads future and past competition containers
 */
test('has containers for future and past competitions', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Tulevat kilpailut' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Viimeisimmät tulokset' })).toBeVisible();
});

/**
 * test if home page loads future and past competition containers
 */
test('containers have children = data', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Tulevat kilpailut' })).toBeVisible();
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
