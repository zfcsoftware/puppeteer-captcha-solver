const pageState = (page) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isPageClosed = () => !page || page.isClosed();
            if (await isPageClosed()) {
                resolve(false)
            } else {
                resolve(true)
            }
        } catch (err) {
            resolve(false)
        }

    })
}

const sleep = (ms) => {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(true)
        },ms)
    })
}

module.exports = {
    pageState,
    sleep
}