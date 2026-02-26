const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  await page.waitForSelector('button ::-p-text(+ Schedule)', { timeout: 5000 });
  await page.click('button ::-p-text(+ Schedule)');
  
  await page.waitForSelector('button ::-p-text(Save Session)');
  // fill if needed, but defaults should be fine.
  await page.click('button ::-p-text(Save Session)');
  
  await page.waitForTimeout(1000);
  const html = await page.content();
  console.log("calendar text:", await page.evaluate(() => document.body.innerText));
  
  await browser.close();
})();
