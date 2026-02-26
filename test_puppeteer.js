const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto('http://localhost:5173');

    console.log("Waiting for schedule button...");
    await page.waitForSelector('button ::-p-text(+ Schedule)', { timeout: 5000 });
    await page.click('button ::-p-text(+ Schedule)');

    console.log("Waiting for form...");
    await page.waitForSelector('input[placeholder="e.g., Research Grant Review"]');
    
    // Type in a title so we can find it
    await page.type('input[placeholder="e.g., Research Grant Review"]', 'MY TEST EVENT');

    console.log("Clicking Save Session...");
    await page.click('button ::-p-text(Save Session)');
    
    await page.waitForTimeout(1000);
    
    // Check if MY TEST EVENT is on the page
    const text = await page.evaluate(() => document.body.innerText);
    if (text.includes("MY TEST EVENT")) {
        console.log("SUCCESS: Found event in the DOM!");
        // Where is it?
        const dayViewText = await page.evaluate(() => {
            const el = document.querySelector('main');
            return el ? el.innerText : '';
        });
        if (dayViewText.includes("MY TEST EVENT")) {
            console.log("Found it in main section!");
        } else {
            console.log("Found it but NOT in main... wait it might be in RightPanel?");
        }
        
    } else {
        console.log("FAILED: Event not found on the page.");
    }

    await browser.close();
})();
