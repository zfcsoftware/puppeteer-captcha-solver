# Puppeteer Captcha Solver
This library enables automatic resolution of common Captchas when using puppeteer.

This library works asynchronously. It stops automatically when the page is closed. It constantly checks if the page is active. Automatically solves supported Captchas without you having to take any action.

If Captchas recognize that you are a bot, please check this library.
[puppeteer-real-browser](https://github.com/zfcsoftware/puppeteer-real-browser)

## Usage

```bash
npm i puppeteer-captcha-solver
```


```js
const puppeteer_captcha_solver = require('puppeteer-captcha-solver')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())


puppeteer.launch({ headless: false }).then(async browser => {
    
    const pages = await browser.pages()
    const page = pages[0]

    await page.goto('https://nopecha.com/demo/cloudflare',{
        waitUntil: 'domcontentloaded'
    })

    puppeteer_captcha_solver.autoSolve({
        page: page,
        config: {
            turnstile: true
        }
    })

    // You can continue your operations here.

})

```