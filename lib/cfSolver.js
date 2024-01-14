const general = require('./general.js')

const checkCaptcha = (page) => {
    return new Promise(async (resolve, reject) => {

        var checkFC = await page.evaluate(() => {
            var global_status = false

            try {
                document.querySelectorAll('iframe').forEach((el) => {
                    if (el.src.indexOf('/cdn-cgi/challenge-platform/h/b/turnstile') > -1) {
                        global_status = true
                        return;
                    }
                })
                return global_status
            } catch (err) {
                return global_status
            }
        }).catch(err => { return false })
        resolve(checkFC)
        return;
    })
}

const allClick = (page) => {
    return new Promise(async (resolve, reject) => {



    })
}

const CPsolve = (page) => {
    return new Promise(async (resolve, reject) => {
        try {

            const frames = await page.frames().filter(frame => frame.url().indexOf('/cdn-cgi/challenge-platform/h/b/turnstile') > -1)


            if (frames.length > 0) {


                for (var item of frames) {
                    try {

                        await item.click('body');

                        var active_frame = item.childFrames()[0]

                        if (active_frame) {
                            await active_frame.hover('[type="checkbox"]').catch(err => { })
                            await active_frame.click('[type="checkbox"]').catch(err => { })
                        }

                        await general.sleep(500)
                    } catch (err) {
                        console.log(err);
                    }

                }


            }


        } catch (err) { }

        resolve(true)
    })
}





const cron = (page) => {
    return new Promise(async (resolve, reject) => {
        var status = await general.pageState(page)

        while (status) {

            var cp_status = await checkCaptcha(page)

            if (cp_status) {
                await CPsolve(page)
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