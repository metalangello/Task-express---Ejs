const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const Bcrypt = require('./bcrypt');

//passport SIGNUP
passport.use('Local.signup', new LocalStrategy({
    usernameField: 'user',
    passwordField : 'pass',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname } = req.body;
    const newUser = {
        fullname,
        username,
        password
    };
     newUser.password = await Bcrypt.passwordEncrypt(password);
    console.log(newUser);
    //const result = await pool.query('INSERT INTO user SET ?',[newUser]);
}))