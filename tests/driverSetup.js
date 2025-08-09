// driverSetup.js
const { Builder, Browser } = require('selenium-webdriver');
const { allure } = require('allure-mocha/runtime');
const { attachment } = require('allure-js-commons');

class DriverManager {
  static async initializeDriver() {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    return driver;
  }

  static async quitDriver(driver) {
    if (driver) {
      await driver.quit();
    }
  }

  static async takeScreenshotOnFailure(driver, error) {
    try {
      const image = await driver.takeScreenshot();
      attachment('Screenshot on Failure', Buffer.from(image, 'base64'), 'image/png');
    } catch (screenshotError) {
      console.error('Failed to take screenshot:', screenshotError);
    }
    throw error; // Re-throw the original error
  }
}

module.exports = DriverManager;