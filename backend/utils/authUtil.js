const bcrypt = require('bcrypt');
const {SALT_ROUNDS} = require('../src/config/serverConfig');

function hashPassword (plainPassword){

    const salt = bcrypt.genSaltSync(Number(SALT_ROUNDS));
    return bcrypt.hashSync(plainPassword.toString(),salt) ;
}

module.exports = {
    hashPassword:hashPassword
}
