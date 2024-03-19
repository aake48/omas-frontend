import { test, expect } from '@playwright/test';

/**
 * test if page loads dropdowns
 */
test('has dropdowns with year title', async ({ page }) => {
    await page.goto('/tulokset');

    const dropdown = page.locator('div', {
        has: page.getByText("2024", { exact: true })
    }).nth(0);

    await expect(dropdown).toBeVisible();
})

/**
 * test if page loads competitions when clicking year
 */
test('has competitions in dropdown', async ({ page }) => {
    await page.goto('/tulokset');

})

/**
 * test if page loads scores when clicking competition
 */
test('has scores in dropdown', async ({ page }) => {
    await page.goto('/tulokset');

})

/**
 * test if clicking paginator last page btn gets more data
 */
test('paginator last page btn gets more data', async ({ page }) => {
    await page.goto('/tulokset');

})
