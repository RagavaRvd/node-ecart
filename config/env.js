const {_get:get} = require('lodash');
const config = require('config');

let env = {};


const envInitializations = (()=>{
    env['envType'] = config.get('envType')
    env['exemptedRoutes'] = config.get('exemptedRoutes')
    env['DBconfig'] = config.get('DBconfig')
    env['appPort'] = config.get('appPort')
})();


