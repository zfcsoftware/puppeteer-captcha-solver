# Puppeteer Captcha Solver
This library enables automatic resolution of common Captchas when using puppeteer.

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



})

```