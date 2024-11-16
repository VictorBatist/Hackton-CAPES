const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const db = require('./config/db');
require('./config/passport')(passport);
const user = require('./routes/user')

const PORT = process.env.PORT || 8081;

app.use('/user', user)
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.listen(PORT, () => {
    console.log(`🔹 O servidor está ONLINE! Porta: ${PORT} 🔹`);
});