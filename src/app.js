const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const sessiondb = require('express-mysql-session');
const flash = require('connect-flash');
const { database } = require('./keys');
const passport = require('passport');

//inicializacion

const app = express();

//configuracion

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(session({
    secret: 'appEJS',
    resave: false,
    saveUninitialized: false,
    store: new sessiondb(database)
}))
app.use(flash());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());

//variables globales
app.use((req, res, next) => {
    app.locals.alert = req.flash('alert');
    next();
})

//routes

app.use(require('./routes'));
app.use(require('./routes/autenticated.js'));

//publics

app.use(express.static(path.join(__dirname, 'public')));

//inicializacion del servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor iniciado en puerto : ${app.get('port')}`);
})