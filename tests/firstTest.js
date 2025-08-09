const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const { allure } = require('allure-mocha/runtime');
const assert = require('assert');

describe('Google Search Test', function () {
    this.timeout(60000);

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
    });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it('should open Google and search for WebDriver', async function () {
        try {
            allure.logStep('Navigate to Google');
            await driver.get('https://www.google.com/ncr');

            allure.logStep('Type search term "webdriver"');
            await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);

            allure.logStep('Wait for title to contain "webdriver"');
            await driver.wait(until.titleContains('webdriver'), 10000);

            const title = await driver.getTitle();
            assert.ok(title.toLowerCase().includes('webdriver'), 'Title does not contain "webdriver"');

        } catch (error) {
            const image = await driver.takeScreenshot();
            allure.attachment('Screenshot on Failure', Buffer.from(image, 'base64'), 'image/png');
            throw error;
        }
    });
});