const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const { allure } = require('allure-mocha/runtime');
const { step, attachment } = require('allure-js-commons');
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
            await step('Navigate to Google', async () => {
                await driver.get('https://www.google.com/ncr');
            });
            
            await step('Type search term "webdriver"', async () => {
               await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
            });
            
            await step('Wait for title to contain "webdriver"', async () => {
                await driver.wait(until.titleContains('webdriver'), 10000);
            });

            const title = await driver.getTitle();
            assert.ok(title.toLowerCase().includes('webdriver'), 'Title does not contain "webdriver"');

        } catch (error) {
            const image = await driver.takeScreenshot();
            attachment('Screenshot on Failure', Buffer.from(image, 'base64'), 'image/png');
            throw error;
        }
    });
});