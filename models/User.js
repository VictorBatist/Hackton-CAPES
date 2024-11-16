const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true,
    unique: true 
  },
  dataNasc: {
    type: String,
    required: true
  }
});

const Usuario = mongoose.model('usuarios', UsuarioSchema);
module.exports = Usuario;