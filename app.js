const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const db = require('./config/db');
require('./config/passport')(passport);
const user = require('./routes/user')
db();

// Define a porta
const PORT = process.env.PORT || 8081;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Rotas personalizadas
app.use('/user', user);

// Arquivos estáticos
app.use(express.static('public'));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`🔹 O servidor está ONLINE! Porta: ${PORT} 🔹`);
});
