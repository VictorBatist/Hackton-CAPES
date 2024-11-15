const mongoose = require('mongoose');

const db = () => {
  mongoose.connect('mongodb://localhost:27017/CAPES-hackathon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conectao ao banco com sucesso');
  })
  .catch((err) => {
    console.error('Erro de conexão com o MongoDB:', err);
  });
};

module.exports = db;