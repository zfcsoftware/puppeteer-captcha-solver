const cfSolver = require('./lib/cfSolver.js');
const rcp2Solver = require('./lib/rcpSolver.js');





const autoSolve = ({ page, config }) => {
    return new Promise((resolve, reject) => {
        
        if (config.cloudflare) {
            cfSolver.cron(page)
        }

        if (config.recaptchav2) {
            rcp2Solver.cron(page)
        }


    })
}



module.exports = {
    autoSolve
};