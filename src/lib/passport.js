const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const Bcrypt = require('./bcrypt');

//passport Signin

passport.use('Local.signin', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'pass',
    passReqToCallback:  true
}, async (req, username, password, done) => {
    const row = await pool.query('SELECT * FROM user WHERE username = ?',[username]);
    if(row.length > 0){
        const user = row[0];
        const validPass = await Bcrypt.passwordDecrypt(password, user.password);
        if(validPass){
           done(null, user, req.flash('alert', 'Bienvenido ' + user.fullname));
        }else{
           done(null, false, req.flash('err', 'password incorrecto'));
        }
    }
    else{
        done(null, false, req.flash('err','usuario no existe'));
    }
}))

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