import { chromium } from 'playwright';

(async () => {
  // Launch browser
  const browser = await chromium.launch();

  // Create a new browser context
  const context = await browser.newContext();

  // Create a new page
  const page = await context.newPage();

  // Navigate to the webpage
  await page.goto('http://localhost:3000/');

  // Click the header element with specific name (replace 'Header Name' with the actual name)
  await page.click('text=Asetukset');

  // Wait for the page to load after header click (replace 'networkidle' with appropriate load state)
  await page.waitForLoadState('networkidle');
  const h1Element = await page.$('p');
  const textContent = h1Element ? await h1Element.textContent() : null;

  // Perform further actions or assertions as needed
    // Verify text content
    if (textContent && textContent.includes('Asetuksia ei voi muuttaa, ennen kuin olet kirjautunut sisään')) {
      console.log('Pass! Asetuksia ei voi muuttaa jos et kirjaudu.');
    } else {
      console.error('Test Failed! Asetuksiin paastiin kasiksi kirjautumatta.');
    }

  // Close the browser
  await browser.close();
})();