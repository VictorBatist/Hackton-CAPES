const express = require("express");
const router = express.Router();
mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("usuarios");
const bcrypt = require("bcryptjs")
const passport = require("passport")

router.post("/register", async (req, res) => {
    const { dia, mes, ano, nome, cpf, senha, senha2 } = req.body;
  
    let errors = [];
  
    const now = new Date();
    const anoAtual = now.getFullYear();
    

    if (Number(dia) > 31 || Number(dia) < 1 || Number(mes) < 1 || Number(mes) > 12 || Number(ano) > anoAtual) {
      errors.push("Data inválida");
    }
    if (anoAtual - Number(ano) < 18) {
      errors.push("Usuário não possui idade suficiente");
    }
    const cpfSemFormatacao = cpf.replace(/\D/g, "");
    if (!/^\d{11}$/.test(cpfSemFormatacao)) {
      errors.push("CPF inválido");
    }
    if (senha !== senha2) {
      errors.push("As senhas não coincidem");
    }
    if (senha.length <= 4) {
      errors.push("Senha muito curta");
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
  
    try {
      const existingUser = await User.findOne({ cpf: cpfSemFormatacao });
  
      if (existingUser) {
        errors.push("CPF já está cadastrado.");
        return res.status(400).json({ errors });
      }
  
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(senha, salt);
  
      const newUser = new User({
        nome: nome,
        senha: hash,
        cpf: cpfSemFormatacao,
        dataNasc: `${dia}-${mes}-${ano}`,
      });
  
      await newUser.save();
      res.status(201).send("Usuário registrado com sucesso");
    } catch (err) {
      console.error("Erro ao registrar usuário:", err);
      res.status(500).send("Erro no servidor");
    }
  });
  

router.post('/login', (req,res,next) => {
    console.log(req.body.cpf)
    console.log(req.body.senha)
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/",
        failureFlash: true
    })(req,res,next)
})

router.get("/sair", (req,res,next) => {
    req.logout((err) => {
        if(err){
            return next(err)
        }
        req.flash('success_msg', "Deslogado com sucesso!")
        res.redirect("/")
    })
})

module.exports = router