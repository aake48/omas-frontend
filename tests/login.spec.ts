import { test, expect, Page } from '@playwright/test';

/**
 * test if registering an account and login works
 */
test.describe('register an account and login', () => {
    const register = async (page: Page) => {
        await page.goto('/rekisteroidy');

        await page.getByLabel('Sähköposti').fill('email@email.com');
        await page.getByLabel('Nimi').fill('nimi123');
        await page.getByLabel('Käyttäjätunnus').fill('kj123');
        await page.getByLabel('Salasana', { exact: true }).fill('sala123');
        await page.getByLabel('Salasana uudelleen').fill('sala123');

        await page.getByRole('button', { name: 'Rekisteröidy' }).click();
    }

    test('register', async ({ page }) => {
        await register(page);
        await expect(page).toHaveURL('/rekisteroidy');
    })

    test('login', async ({ page }) => {
        await register(page);
        await page.goto('/kirjaudu');

        await page.getByLabel('Käyttäjätunnus').fill('kj123');
        await page.getByLabel('Salasana').fill('sala123');

        await page.getByRole('button', { name: 'Kirjaudu' }).click();

        await expect(page).toHaveURL('/kilpailut');
    })
})