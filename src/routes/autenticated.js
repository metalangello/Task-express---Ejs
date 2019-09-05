const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedin, isNotLoggedin} = require('../lib/isAutenticated');

//rut get profile
router.get('/profile', (req, res) => {
    res.send('profile access');
})

//rut signin get
router.get('/signin', isNotLoggedin, (req, res) => {
    res.render('sign/signin.ejs',{
        title: 'signin'
    })
})

//rut signin post
router.post('/signin', isNotLoggedin, (req, res, next) => {
    passport.authenticate('Local.signin', {
        successRedirect: '/home',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
})

//rut get signup

router.get('/signup', isNotLoggedin, (req, res) => {
    res.render('sign/signup.ejs',{
        title: 'signup'
    });
})

//rut post signup
router.post('/signup', isNotLoggedin, passport.authenticate('Local.signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
}));

//rut logout
router.get('/logout', isLoggedin, (req, res) => {
    req.logOut();
    res.redirect('/task');
})

module.exports = router;