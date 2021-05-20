const puppeteer = require('puppeteer-electron');

(async () => {
    const app = await puppeteer.launch({ headless: false });
    const pages = await app.pages()
    const [page] = pages
    await page.setViewport({ width: 1366, height: 768 });

    // CLear localstorage
    await page.goto('http://localhost:8080/login');
    await page.evaluate(() => {
        localStorage.clear()
    });

    // start (login page)
    await page.goto('http://localhost:8080/login');
    console.log('LOG : Start at login')

    // Go to forgotten password
    await page.waitForSelector('#forgotPasswordButton');
    await page.click('#forgotPasswordButton');
    await page.waitForNavigation();
    if (page.url() != 'http://localhost:8080/forgotPassword') {
        throw new Error('erreur : boutton mot de passe oublié');
    }
    console.log('LOG : arrived to forgotPassword')
    //await page.screenshot({ path: 'example.png' });

    //Go back to login
    await page.waitForSelector('#returnButton');
    await page.click('#returnButton');

    //await page.waitForNavigation();
    if (page.url() != 'http://localhost:8080/login') {
        throw new Error('erreur : retour login depuis mot de passe oublié');
    }
    console.log('LOG : go back to login')

    // Login user and access to list post
    await page.waitForSelector('#emailInput');
    await page.type('#emailInput', 'alexis.savoie.555@gmail.com');
    await page.type('#passwordInput', 'bonjour11');
    await page.click('#loginButton');
    await page.waitForNavigation();
    if (page.url() != 'http://localhost:8080/listPost') {
        throw new Error('erreur : login utilisateur');
    }
    console.log('LOG : Login successful')

    // Test current admin display
    await page.waitForSelector('#currentAdmin');
    const currentAdmin = await page.$eval('#currentAdmin', el => el.innerText);
    if (currentAdmin != 'alexis.savoie.555@gmail.com') {
        throw new Error('erreur : currentAdmin display not working');
    }
    console.log('LOG : currentAdmin works !')

    // Test default table content
    let texts = await page.evaluate(() => {
        let data = [];
        let elements = document.getElementsByClassName('text-start');
        for (var element of elements)
            data.push(element.textContent);
        return data;
    });
    if (texts[9] != 'alexis.savoie.555@gmail.com') {
        throw new Error('erreur : listPost table not displaying correctly (before search)');
    }
    console.log('LOG : listPost table displaying correctly (before search)')

    // test table after research
    await page.type('#emailPublisherInput', 'alexis2');
    await page.click('#refreshButton');

    let texts2 = await page.evaluate(() => {
        let data = [];
        let elements = document.getElementsByClassName('text-start');
        for (var element of elements)
            data.push(element.textContent);
        return data;
    });
    if (texts2[9] != '') {
        throw new Error('erreur : listPost table not displaying correctly (after search)');
    }
    console.log('LOG : listPost table displaying correctly (after search)')

    // Go to post detail
    const input = await page.$('#emailPublisherInput');
    await input.click({ clickCount: 3 })
    await page.type('#emailPublisherInput', 'alexis');
    await page.click('#refreshButton');
    await page.waitForSelector('.actionButton');
    const buttons = await page.$$('.actionButton')
    await buttons[0].click()
    await page.waitForNavigation();
    if (!page.url().includes('http://localhost:8080/detailPost')) {
        throw new Error('erreur : enter detailPost');
    }
    console.log('LOG : Enter detailPost')

    // Check if data is displaying properly
    await page.waitForSelector('#emailPublisherInput');
    const emailPublisherInput = await page.$eval('#emailPublisherInput', el => el.value);

    if (emailPublisherInput != 'alexis.savoie.555@gmail.com') {
        throw new Error('erreur : detailPost not displaying correctly (emailPublisher)');
    }

    // Go to settings and check if alert works
    await page.click('#goToSettings');
    await page.waitForNavigation();

    await page.waitForSelector('#changePasswordButton');
    await page.click('#changePasswordButton');

    // Check if alert is visible
    await page.waitForSelector('.v-overlay.v-overlay--active.theme--dark');
    if (await page.$('.v-overlay.v-overlay--active.theme--dark') == null) {
        throw new Error('erreur : basicAlert not working when empty input (changePassword)');
    }
    console.log('LOG : basicAlert working when empty input (changePassword)')


    // Check if the message is correct
    await page.waitForSelector('.text-h5.pa-12');
    if (await page.$eval('.text-h5.pa-12', el => el.textContent) != 'Erreur : longeur de mot de passe trop court/long !') {
        throw new Error('erreur : basicAlert incorrect message (when changePassword success)');
    }
    console.log('LOG : basicAlert correct message (when changePassword empty fields)')

    await page.waitForSelector('#closeButton');
    await page.click('#closeButton');


    await page.waitForSelector('#closeButton');
    await page.click('#closeButton');

    // Check if change password words
    await page.waitForSelector('#oldPasswordInput');
    await page.type('#oldPasswordInput', 'bonjour11');
    await page.type('#newPasswordInput', 'bonjour11');
    await page.type('#confirmPasswordInput', 'bonjour11');

    await page.waitForSelector('#changePasswordButton');
    await page.click('#changePasswordButton');

    // Check if alert is visible
    await page.waitForSelector('.v-overlay.v-overlay--active.theme--dark');
    if (await page.$('.v-overlay.v-overlay--active.theme--dark') == null) {
        throw new Error('erreur : basicAlert not working (2)');
    }
    console.log('LOG : basicAlert working when corrects inputs (changePassword)')



    // Check if the message is correct
    await page.waitForSelector('.text-h5.pa-12');

    if (await page.$eval('.text-h5.pa-12', el => el.textContent) != 'Votre mot de passe à été modifié !') {
        throw new Error('erreur : basicAlert incorrect message (when changePassword success)');
    }
    console.log('LOG : basicAlert correct message (when changePassword success)')

    await page.waitForSelector('#closeButton');
    await page.click('#closeButton');



    /*
    await page.waitForSelector('.v-overlay.v-overlay--active.theme--dark');
    const CSSprops = await page.$eval('.v-overlay.v-overlay--active.theme--dark', el => {
        const stylesObject = getComputedStyle(el)
        const styles = {}
        for (const prop in stylesObject) {
            if(stylesObject.hasOwnProperty(prop)) {
                styles[prop] = stylesObject[prop]
            }
        }
        return styles
    })

    console.log(CSSprops.display)
*/


    // Logout and go back to login page
    await page.click('#logoutButton');
    await page.waitForNavigation();
    if (page.url() != 'http://localhost:8080/login') {
        throw new Error('erreur : retour logout');
    }
    console.log('LOG : logout successfull')

    // Finish
    console.log('LOG : Finished')
    await app.close()


})()