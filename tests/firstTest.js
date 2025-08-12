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

/*
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
*/

/*
describe('Drag and Drop Operation', async function () {
    this.timeout(30000);
    it('Drag and Drop', async function () {
        try {
            await step('Perform drag and drop action', async () => {
                // Navigate to the test page
                await driver.navigate().to('https://www.selenium.dev/selenium/web/mouse_interaction.html');
                await driver.sleep(3000); // Wait for page load

                // Maximize the window
                await driver.manage().window().maximize();
                await driver.sleep(3000); // Wait for maximization

                // Find source and target elements
                const srcEle = await driver.findElement(By.id("draggable"));
                const desEle = await driver.findElement(By.id("droppable"));

                // Perform drag and drop action
                await driver.actions()
                    .dragAndDrop(srcEle, desEle)
                    .perform();
                await driver.sleep(3000); // Wait to observe the result
            });
        } catch {
            await DriverManager.takeScreenshotOnFailure(driver, e);
        }
    });
});
*/

describe('Execute javascript code for automation', async function () {
    this.timeout(110000);
    it('Automation of Amazon', async function () {
        try {

            await step('Opening Amazon and perform Scroll and click', async () => {
                // await driver.navigate().to('https://www.amazon.in')
                // attachment('Status', 'Step "Opening amazon webpage diectly" completed successfully', 'text/plain');
                // await driver.sleep(3000);


                await driver.get("https://duckduckgo.com/");
                await driver.sleep(2000);
                attachment('Status', 'Step "Navigate to DuckDuckGo" completed successfully', 'text/plain');

                await driver.navigate().refresh();
                await driver.sleep(3000);
                attachment('Status', 'Step "Makes the google page refresh" completed successfully', 'text/plain');

                await driver.manage().window().minimize();
                await driver.sleep(3000);
                attachment('Status', 'Step "Makes the google page minimized" completed successfully', 'text/plain');


                await driver.manage().window().setSize(500, 900);
                await driver.sleep(3000);
                attachment('Status', 'Step "Makes the google page of 500 x 900" completed successfully', 'text/plain');

                const windowSize = await driver.manage().window().getSize();
                console.log("Height : " + windowSize.height + " Width : " + windowSize.width);

                await driver.manage().window().maximize();
                attachment('Status', 'Step "Maximising webpage" completed successfully', 'text/plain');
                await driver.sleep(2000);

                // Type search term and press Enter
                await driver.findElement(By.name('q')).sendKeys('Amazon.in', Key.RETURN);
                await driver.sleep(3000);
                attachment('Status', 'Step "Type search term Amazon.in" completed successfully', 'text/plain');

                await driver.wait(until.elementsLocated(By.xpath("//a[contains(., 'Amazon.in')]")), 10000);
                const amazonLinks = await driver.findElements(By.xpath("//a[contains(., 'Amazon.in')]"));
                if (amazonLinks.length > 0) {
                    await driver.executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", amazonLinks[0]);
                    await driver.sleep(1000);
                    await amazonLinks[0].click();
                    attachment('Status', 'Step "Click Amazon.in link" completed successfully', 'text/plain');
                } else {
                    attachment('Error', 'No Amazon.in link found', 'text/plain');
                }

                // const ele = await driver.findElement(By.css("a[href = 'https://www.audible.in/']"));
                // // sudden movement of page and stops at target element
                // await driver.actions().move({ origin: ele }).pause(2000).perform();
                // attachment('Status', 'Step "Use of move function for quick reach" completed successfully', 'text/plain');
                // await driver.sleep(2000);

                await driver.findElement(By.id('twotabsearchtextbox')).sendKeys('smartwatch', Key.RETURN);
                attachment('Status', 'Step "Typed Smartwatch in search box" completed successfully', 'text/plain');
                await driver.sleep(4000);

                await driver.findElement(By.xpath("//span[contains(@class,'a-dropdown-label') and contains(text(),'Sort by')]")).click();
                attachment('Status', 'Step "Clicked on Sortby dropdown" completed successfully', 'text/plain');
                await driver.sleep(2000);
                const bestSeller = await driver.wait(
                    until.elementLocated(By.xpath("//a[contains(@class,'a-dropdown-link') and normalize-space()='Best Sellers']")),
                    5000
                );
                await driver.wait(until.elementIsVisible(bestSeller), 5000);
                await bestSeller.click();
                attachment('Status', 'Clicked on Best Seller" completed successfully', 'text/plain');
                await driver.sleep(2000);

                // midStop
                const midStop = await driver.findElement(By.xpath('//*[@id="p_n_size_two_browse-vebin/6631642031"]'));
                await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", midStop);
                attachment('Status', 'Scrolled down in mid of page" completed successfully', 'text/plain');
                await driver.sleep(2000);

                const nextButton = await driver.findElement(
                    By.xpath("//a[contains(@class,'s-pagination-next') and contains(@aria-label,'Go to next page')]")
                );
                await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", nextButton);
                attachment('Status', 'Step "Scrolled down to go no next page" completed successfully', 'text/plain');
                await driver.wait(until.elementIsVisible(nextButton), 5000);
                await driver.sleep(2000);
                await nextButton.click();
                attachment('Status', 'Clicked on Next" completed successfully', 'text/plain');
                await driver.sleep(2000);

                // Wait for Noise filter and click
                const noiseFilter = await driver.findElement(
                    By.xpath("//span[contains(@class,'a-size-base') and normalize-space()='Noise']")
                );
                await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", noiseFilter);
                await driver.sleep(1000);
                await noiseFilter.click();
                attachment('Status', 'Step "Clicked on Noise checkbox" completed successfully', 'text/plain');
                await driver.sleep(2000);

                const element = await driver.findElement(By.xpath('//span[contains(@class,"a-size-base") and normalize-space()="Band Material Type"]'));
                await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", element);
                attachment('Status', 'Step "Scrolled down slightly down" completed successfully', 'text/plain');
                await driver.sleep(3000);

                // Brands
                const backToBrands = await driver.findElement(By.xpath('//span[contains(@class,"a-size-base") and normalize-space()="Brands"]'));
                await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", backToBrands);
                attachment('Status', 'Step "Scrolled up to choose Fastrack" completed successfully', 'text/plain');
                await driver.sleep(3000);

                // Wait for Fastrack filter and click
                const fastrackFilter = await driver.findElement(
                    By.xpath("//span[contains(@class,'a-size-base') and normalize-space()='Fastrack']")
                );
                await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", fastrackFilter);
                await driver.sleep(2000);
                await fastrackFilter.click();
                attachment('Status', 'Clicked the Fastrack Checkbox" completed successfully', 'text/plain');
                await driver.sleep(3000);

                // MaterialStop
                const midPAge = await driver.findElement(By.xpath('//span[contains(@class,"a-size-base") and normalize-space()="Band Material Type"]'));
                await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", midPAge);
                attachment('Status', 'Step "Scrolled down slightly down again" completed successfully', 'text/plain');
                await driver.sleep(3000);

                // MaterialStop
                const dis50 = await driver.findElement(By.xpath('//span[contains(@class,"a-size-base") and normalize-space()="50% Off or more"]'));
                await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", dis50);
                attachment('Status', 'Step "Scrolled down to choose 50% Discount" completed successfully', 'text/plain');
                await driver.sleep(3000);
                await dis50.click();
                attachment('Status', 'Step "Clicked on the link choose 50% Discount" completed successfully', 'text/plain');
                await driver.sleep(3000);

                const ele1 = await driver.findElement(By.id("nav-cart-count-container"));
                await driver.actions().click(ele1).perform();
                await driver.sleep(2000)
                attachment('Status', 'Step "click action on My Cart" completed successfully', 'text/plain');
                await driver.sleep(2000)

                await driver.executeScript(`document.querySelector("div[class='navFooterColHead']").scrollIntoView({ behavior: "smooth", block: "center" })`);
                await driver.sleep(2000);

                const ele2 = await driver.findElement(By.css("div[class='nav-logo-base nav-sprite']"));
                await driver.sleep(2000);
                await driver.actions().click(ele2).perform();
                attachment('Status', 'Step "click action on bottom amazon logo" completed successfully', 'text/plain');
                await driver.sleep(2000);

                await driver.executeScript(`
                        document.querySelector("a[href='https://www.audible.in/']")
                        .scrollIntoView({ behavior: "smooth", block: "center" });
                    `);
                attachment('Status', 'Step "scrolling to footer amazon logo" completed successfully', 'text/plain');
                await driver.sleep(2000);

                const hoverEle = await driver.wait(
                    until.elementLocated(By.id("icp-touch-link-language")),
                    10000
                );

                await driver.wait(until.elementIsVisible(hoverEle), 5000);
                await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", hoverEle);

                await driver.actions({ bridge: true })
                    .move({ origin: hoverEle })
                    .pause(2000)
                    .perform();

                await driver.sleep(5000);
                attachment('Status', 'Step "Hovering on a dropdown" completed successfully', 'text/plain');

                await driver.executeScript("window.scrollTo({ top: 0, behavior: 'smooth' });");
                await driver.sleep(3000);
                attachment('Status', 'Step "Back to Top of the page" completed successfully', 'text/plain');

            });
        } catch {
            await DriverManager.takeScreenshotOnFailure(driver, e);
        }
    })
});
