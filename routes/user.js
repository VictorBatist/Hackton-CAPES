const express = require("express");
const router = express.Router();
mongoose = require("mongoose");
require("../models/User");
const Usuario = mongoose.model("usuarios");
const bcrypt = require("bcryptjs")
const passport = require("passport")

router.post("/registro", (req,res) => {
    // Essa rota fará o tratamento dos inputs e cadastrará usuário no banco de dados (METODO POST)
})

router.get('/login', (req,res) => {
    // Essa rota exibirá a página de login (METODO GET)
    res.send("TELA DE LOGIN EM CONSTRUÇÃO")
})

router.post('/login', (req,res,next) => {

    // Essa rota fará o reconhecimento do usuário
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/usuario/login/",
        failureFlash: true
    })(req,res,next)
})

router.get("/logout", (req,res,next) => {
    req.logout((err) => {
        if(err){
            return next(err)
        }
        // req.flash('success_msg', "Deslogado com sucesso!")
        res.redirect("/")
    })
})

module.exports = router