import { test, expect } from '@playwright/test';

/**
 * test if page loads dropdown
 */
test('has dropdown with year title (2024)', async ({ page }) => {
    await page.goto('/tulokset');
    await expect(page.getByTestId('score-2024')).toBeVisible();
})

/**
 * test if page loads competitions when clicking year
 */
test('has competitions in dropdown', async ({ page }) => {
    await page.goto('/tulokset');

    const year = page.getByTestId('score-2024');
    const competition = page.getByTestId('competition-kesan_ampujaiset');

    await year.click();
    await expect(competition).toBeVisible();

    // const competitions = await child.evaluate(child =>
    //     child.querySelector('div')
    // );

    // expect(competitions.length).toBe(4);
})

/**
 * test if page loads scores when clicking competition
 */
test.describe('has scores in dropdown', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/tulokset');

        const year = page.getByTestId('score-2024');
        const competition = page.getByTestId('competition-kesan_ampujaiset');
    
        await year.click();
        await expect(competition).toBeVisible();
    
        await competition.click();
    
    })
    
    for (let i = 0; i < 8; i++) {
        test(`team ${i} exists`, async ({ page }) => {
            await expect(page.getByTestId(`team-${i}`).nth(0)).toBeVisible();
        })
    }
})

/**
 * test if clicking paginator last page btn gets more data
 */
test('paginator last page btn gets more data', async ({ page }) => {
    await page.goto('/tulokset');

})
