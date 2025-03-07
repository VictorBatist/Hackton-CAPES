const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const session = require("express-session");
const rotasUsuario = require("../routes/userRoutes");
require("../models/User");
const Usuario = mongoose.model("usuarios");
require("../config/auth")(passport);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(rotasUsuario);

jest.mock("bcryptjs");
jest.setTimeout(30000);

describe("Testes das Rotas de Usuário", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await Usuario.deleteMany({});
    bcrypt.hashSync.mockReturnValue("senhaHash");
  });

  it("Deve registrar um novo usuário", async () => {
    const resultadoEsperado = "Usuário registrado com sucesso";
    const req = {
      body: {
        dia: "01",
        mes: "01",
        ano: "2000",
        nome: "Usuário Teste",
        cpf: "123.456.789-09",
        senha: "senha",
        senha2: "senha",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    await rotasUsuario.handle(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(resultadoEsperado);
  });

  it("Não deve registrar usuário com data inválida", async () => {
    const errosEsperados = ["Data inválida"];
    const req = {
      body: { dia: "32", mes: "01", ano: "2000", nome: "Teste", cpf: "123.456.789-09", senha: "senha", senha2: "senha" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await rotasUsuario.handle(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors: expect.arrayContaining(errosEsperados) });
  });

  it("Não deve registrar usuário com senhas diferentes", async () => {
    const errosEsperados = ["As senhas não coincidem"];
    const req = {
      body: { dia: "01", mes: "01", ano: "2000", nome: "Teste", cpf: "123.456.789-09", senha: "senha1", senha2: "senha2" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await rotasUsuario.handle(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors: expect.arrayContaining(errosEsperados) });
  });

  it("Deve autenticar usuário", async () => {
    const usuario = new Usuario({ nome: "Teste", cpf: "12345678909", senha: bcrypt.hashSync("senha", 10), dataNasc: "01-01-2000" });
    await usuario.save();

    const req = {
      body: { cpf: "123.456.789-09", senha: "senha" },
      login: jest.fn().mockImplementation((user, cb) => cb(null)),
    };
    const res = {
      redirect: jest.fn(),
    };
    const next = jest.fn();

    await rotasUsuario.handle(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith("/");
  });

  it("Deve deslogar usuário", async () => {
    const req = {
      logout: jest.fn().mockImplementation((cb) => cb()),
      flash: jest.fn(),
    };
    const res = {
      redirect: jest.fn(),
    };
    const next = jest.fn();

    await rotasUsuario.handle(req, res, next);
    expect(req.flash).toHaveBeenCalledWith("success_msg", "Deslogado com sucesso!");
    expect(res.redirect).toHaveBeenCalledWith("/");
  });
});
