const { Builder, Browser, By, Key, until } = require('selenium-webdriver')

;(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build()
  try {
    await driver.get('https://www.google.com/ncr')
    await driver.sleep(3000)
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)
    await driver.sleep(30000)
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000)
    await driver.sleep(3000)
  } finally {
    await driver.quit()
  }
})()