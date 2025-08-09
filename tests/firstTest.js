const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const { allure } = require('allure-mocha/runtime');
const { step, attachment } = require('allure-js-commons');
const assert = require('assert');
const DriverManager = require('./driverSetup');

let driver;

before(async function () {
    driver = await DriverManager.initializeDriver();
});

after(async function () {
    await DriverManager.quitDriver(driver);
});

describe('Google Search Test', function () {
    this.timeout(60000);

    it('should open Google and search for WebDriver', async function () {
        try {
            await step('Navigate to Google', async () => {
                await driver.get('https://www.google.com/ncr');
                await driver.sleep(2000);
                attachment('Status', 'Step "Navigate to Google" completed successfully', 'text/plain');
            });

            await step('Type search term "webdriver"', async () => {
                await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
                await driver.sleep(2000);
                attachment('Status', 'Step "Type search term \"webdriver\"" completed successfully', 'text/plain');
            });

            await step('Wait for title to contain "webdriver"', async () => {
                await driver.wait(until.titleContains('webdriver'), 10000);
                await driver.sleep(2000);
                attachment('Status', 'Step "Wait for title to contain \"webdriver\"" completed successfully', 'text/plain');
            });

            const title = await driver.getTitle();
            assert.ok(title.toLowerCase().includes('webdriver'), 'Title does not contain "webdriver"');
        } catch (error) {
            await DriverManager.takeScreenshotOnFailure(driver, error);
        }
    });
});

describe('Navigate commands', function () {
    this.timeout(60000);

    it('should open, maximize, refresh, fullscreen and minimise google page', async function () {
        try {
            await step('Opens the google page', async () => {
                await driver.navigate().to('https://www.google.com/ncr');
                await driver.sleep(3000);
                attachment('Status', 'Step "Opens the google page" completed successfully', 'text/plain');
            });

            await step('Makes the google page maximized', async () => {
                await driver.manage().window().maximize();
                await driver.sleep(3000);
                attachment('Status', 'Step "Makes the google page maximized" completed successfully', 'text/plain');
            });

            await step('Makes the google page refresh', async () => {
                await driver.navigate().refresh();
                await driver.sleep(3000);
                attachment('Status', 'Step "Makes the google page refresh" completed successfully', 'text/plain');
            });

            await step('Makes the google page fullscreen', async () => {
                await driver.executeScript("document.documentElement.requestFullscreen();");
                await driver.sleep(3000);
                attachment('Status', 'Step "Makes the google page fullscreen" completed successfully', 'text/plain');
            });

            await step('Makes the google page minimized', async () => {
                await driver.manage().window().minimize();
                await driver.sleep(3000);
                attachment('Status', 'Step "Makes the google page minimized" completed successfully', 'text/plain');
            });

            await step('Makes the google page of 500 x 900', async () => {
                await driver.manage().window().setSize(500, 900);
                await driver.sleep(3000);
                attachment('Status', 'Step "Makes the google page of 500 x 900" completed successfully', 'text/plain');

                const windowSize = await driver.manage().window().getSize();
                console.log("Height : " + windowSize.height + " Width : " + windowSize.width);
            });
        } catch (e) {
            await DriverManager.takeScreenshotOnFailure(driver, e);
        }
    });
});