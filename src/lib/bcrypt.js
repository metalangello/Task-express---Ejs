const bcrypt = require('bcryptjs');

const Bcrypt = {};

//encrypt - signup
Bcrypt.passwordEncrypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;

}

//decrypt - signin


module.exports = Bcrypt;