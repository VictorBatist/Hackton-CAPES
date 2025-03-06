const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("../models/User");
const Usuario = mongoose.model("usuarios");

module.exports = function (passport) {
    console.log('entrou agr');
    passport.use(
        new LocalStrategy(
            { usernameField: 'cpf', passwordField: 'senha' },
            (cpf, senha, done) => {
                const cpfSemFormatacao = cpf.replace(/\D/g, '');

                Usuario.findOne({ cpf: cpfSemFormatacao })
                    .then((usuario) => {
                        if (!usuario) {
                            return done(null, false, { message: "Usuário não encontrado" });
                        }

                        bcrypt.compare(senha, usuario.senha, (erro, res) => {
                            if (erro) {
                                console.error("Erro ao comparar senhas:", erro);
                                return done(erro);
                            }

                            if (res) {
                                // Senha correta
                                return done(null, usuario);
                            } else {
                                return done(null, false, { message: "Senha incorreta" });
                            }
                        });
                    })
                    .catch((err) => {
                        console.error("Erro ao buscar usuário:", err);
                        return done(err);
                    });
            }
        )
    );
    passport.serializeUser((usuario, done) => {
        done(null, usuario._id);
    });

    passport.deserializeUser((id, done) => {
        Usuario.findById(id)
            .then((usuario) => {
                done(null, usuario);
            })
            .catch((err) => {
                done(null, false, { message: "Algo deu errado" });
            });
    });
};
