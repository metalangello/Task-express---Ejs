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
        user: username,
        password
    };
     newUser.password = await Bcrypt.passwordEncrypt(password);
     const result = await pool.query('INSERT INTO user SET ?',[newUser]);
     newUser.id = result.insertId;
     return done(null, newUser);
}))

//serialize
passport.serializeUser((user, done) => {
    done(null, user.id);
})

//deserialize
passport.deserializeUser( async (id, done) => {
    const row = await pool.query('SELECT * FROM user WHERE id = ?',[id]);
    done(null, row[0]);
})