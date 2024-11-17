const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
console.log('chegou aq')

require("../models/User");
const Usuario = mongoose.model("usuarios");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: 'cpf', passwordField: 'senha' },
            (cpf, senha, done) => {
                console.log('Tentativa de login:', cpf, senha);

                // Remove formatação do CPF
                const cpfSemFormatacao = cpf.replace(/\D/g, '');

                // Busca o usuário no banco pelo CPF
                Usuario.findOne({ cpf: cpfSemFormatacao })
                    .then((usuario) => {
                        if (!usuario) {
                            return done(null, false, { message: "Usuário não encontrado" });
                        }

                        // Compara a senha fornecida com a senha criptografada
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

    // Serialização e desserialização do usuário
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
