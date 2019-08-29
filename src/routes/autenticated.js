const express = require('express');
const router = express.Router();
const passport = require('passport');

//rut get profile
router.get('/profile', (req, res) => {
    res.send('profile access');
})

//rut get signup

router.get('/signup', (req, res) => {
    res.render('sign/signup.ejs');
})

//rut post signup
router.post('/signup', passport.authenticate('Local.signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
}));
module.exports = router;