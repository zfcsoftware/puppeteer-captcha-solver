const general = require('./general.js')
const solveModule = require('./module/rcp.js')


const checkCaptcha = (page) => {
    return new Promise(async (resolve, reject) => {
        var stat = await page.evaluate(() => {
            var global_status = false
            try {
                document.querySelectorAll('iframe').forEach((el) => {
                    if (el.src.indexOf('www.google.com/recaptcha/api2/anchor') > -1) {
                        global_status = true
                        return;
                    }
                })
                return global_status
            } catch (err) {
                return global_status
            }
        }).catch(err => { return false })

        resolve(stat)
    })
}









const cron = (page) => {
    return new Promise(async (resolve, reject) => {
        var status = await general.pageState(page)

        while (status) {

            var cp_status = await checkCaptcha(page)

            if (cp_status) {
                await general.sleep(500)
                try {
                    await solveModule(page).catch(err => { return false })
                } catch (err) { }
            }

            await general.sleep(500)

            status = await general.pageState(page)
        }

        resolve(true)


    })
}


module.exports = {
    cron
}