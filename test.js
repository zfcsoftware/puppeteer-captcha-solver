const puppeteer = require('puppeteer-extra')
const solver = require('./index.js')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())


puppeteer.launch({ headless: false }).then(async browser => {
    const pages = await browser.pages()
    const page = pages[0]
    await page.goto('https://2captcha.com/demo/recaptcha-v2',{
        waitUntil: 'domcontentloaded'
    })

    solver.autoSolve({
        page: page,
        config: {
            cloudflare: true,
            recaptchav2: true
        }
    })



})