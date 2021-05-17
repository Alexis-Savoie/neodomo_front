/*
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();


    await page.goto('http://localhost:8080/login');

    await page.waitForSelector('#emailInput');

    await page.type('#emailInput', 'alexis.savoie.555@gmail.com');
    await page.type('#passwordInput', 'bonjour11');

    await page.screenshot({ path: 'example.png' });


    //await browser.close();

    await page.click('#loginButton');

    await page.waitForNavigation();

    console.log('New Page URL:', page.url());

    await browser.close();
})();
*/
const puppeteer = require('puppeteer-electron');

(async () => {
    const app = await puppeteer.launch({ headless: true });
    const pages = await app.pages()
    const [page] = pages
    await page.setViewport({ width: 1366, height: 768});

    await page.goto('http://localhost:8080/login');
    await page.evaluate(() => {
        localStorage.clear()
    });

    await page.goto('http://localhost:8080/login');
    await page.waitForSelector('#emailInput');
    await page.type('#emailInput', 'alexis.savoie.555@gmail.com');
    await page.type('#passwordInput', 'bonjour11');

    


    //await browser.close();
    await page.click('#loginButton');
    await page.waitForNavigation();
    console.log('New Page URL:', page.url());

    await page.click('#logoutButton');
    await page.waitForNavigation();
    console.log('New Page URL:', page.url());
    //await page.screenshot({ path: 'example.png' });
    setTimeout(async () => await app.close(), 5000)
})()