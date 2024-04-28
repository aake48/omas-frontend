"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = require("playwright");
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Launch browser
    const browser = yield playwright_1.chromium.launch();
    // Create a new browser context
    const context = yield browser.newContext();
    // Create a new page
    const page = yield context.newPage();
    // Navigate to the webpage
    yield page.goto('http://localhost:3000/');
    // Click the header element with specific name (replace 'Header Name' with the actual name)
    yield page.click('text=Asetukset');
    // Wait for the page to load after header click (replace 'networkidle' with appropriate load state)
    yield page.waitForLoadState('networkidle');
    const h1Element = yield page.$('p');
    const textContent = h1Element ? yield h1Element.textContent() : null;
    // Perform further actions or assertions as needed
    // Verify text content
    if (textContent && textContent.includes('Asetuksia ei voi muuttaa, ennen kuin olet kirjautunut sisään')) {
        console.log('Pass! Asetuksia ei voi muuttaa jos et kirjaudu.');
    }
    else {
        console.error('Test Failed! Asetuksiin paastiin kasiksi kirjautumatta.');
    }
    // Close the browser
    yield browser.close();
}))();
