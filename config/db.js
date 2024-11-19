const mongoose = require('mongoose');

const db = () => {
  mongoose.connect('mongodb://localhost:27017/CAPES-hackathon')
  .then(() => {
    console.log('✔ Conectado ao mongoDB com sucesso');
  })
  .catch((err) => {
    console.error('❌ Erro de conexão com o MongoDB:', err);
  });
};

module.exports = db;