const express = require('express');
const router = express.Router();
const passport = require('passport');


//rut get signup

router.get('/signup', (req, res) => {
    res.render('sign/signup.ejs');
})

module.exports = router;