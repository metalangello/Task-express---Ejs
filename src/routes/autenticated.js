const express = require('express');
const router = express.Router();
const passport = require('passport');

//rut get profile
router.get('/profile', (req, res) => {
    res.send('profile access');
})

//rut signin get
router.get('/signin', (req, res) => {
    res.render('sign/signin.ejs',{
        title: 'signin'
    })
})

//rut signin post
router.post('/signin', (req, res, next) => {
    passport.authenticate('Local.signin', {
        successRedirect: '/home',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
})

//rut get signup

router.get('/signup', (req, res) => {
    res.render('sign/signup.ejs',{
        title: 'signup'
    });
})

//rut post signup
router.post('/signup', passport.authenticate('Local.signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
}));

//rut logout
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
})
module.exports = router;