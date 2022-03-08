if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { name } = require('ejs');

const initializePassport = require('./passport-config');
const passport = require('passport');
const { use } = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override')

initializePassport(passport, email =>
    users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);


const port = 3000;
const base = `${__dirname}/public`;
const base1 = `${__dirname}/views`;

const users = [];
app.use(express.static('public'));

const path = require("path")
const viewspath = path.join(__dirname, "/views")
app.set("views", viewspath)

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.urlencoded({ extended: false }))

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'));

app.get('/', function (req, res) {
    res.sendFile(`${base}/wel.html`);
});

app.get('/index', (req, res) => {
    res.sendFile(`${base1}/index.html`);
});

app.get('/warehouse', (req, res) => {
    res.sendFile(`${base1}/warehouse.html`);
});

app.get('/shop', function (req, res) {
    res.sendFile(`${base}/shop.html`);
});

app.get('/reg', function (req, res) {
    res.sendFile(`${base}/register-device.html`);
});

app.get('/device', function (req, res) {
    res.sendFile(`${base}/device-list.html`);
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render(`${base1}/login.ejs`);
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render(`${base1}/register.ejs`);
});

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login');
    } catch (error) {
        res.redirect('/register');
    }
});

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/index')
    }

    next()
}

app.get('*', (req, res) => {
    res.sendFile(`${base}/404.html`);
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});