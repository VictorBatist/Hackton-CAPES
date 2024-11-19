const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const db = require('./config/db');
const session = require('express-session');
const flash = require("connect-flash")
const user = require('./routes/user')
require('./config/passport')(passport);

db();

const { TratarDadosOpenAlex } = require("./public/js/tratarDadosOpenAlex");

// Define a porta
const PORT = process.env.PORT || 8081;

//#Configurações
    // Sessão
    app.use(session({
        secret: "sessao_segura",
        resave: true,
        saveUninitialized: true
    }))

    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
// Middleware
    app.use((req,res,next)=>{
        res.locals.sucess_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        res.locals.error = req.flash("error")
        res.locals.user = req.user || null;
        console.log(res.locals.user)
        next();
    })
//Express
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
//Handlebars
    app.engine('handlebars', handlebars.engine({
        defaultLayout: 'main',
        handlebars: require('handlebars'),
        runtimeOptions: {
            allowProtoPropertiesByDefault: true
        }
    }));
    app.set('view engine', 'handlebars');
// Public
    app.use(express.static('public'));
    app.use((req,res,next)=>{
        next()
    })
    app.use('/user', user)

// Rota principal
app.get('/', (req, res) => {
    res.render("index")
});
//#Configurações

// Rota de pesquisa de artigos
app.get('/search', async (req, res) => {
  const pesquisaUsuario = req.query.query;
  
  if (!pesquisaUsuario) {
    return res.render("search/search", {
      error: "Por favor, insira um termo de pesquisa.",
      pesquisaUsuario
    });
  }

  const { artigos, totalResults, error } = await TratarDadosOpenAlex(pesquisaUsuario)
  console.log(artigos)
  console.log(totalResults)
  res.render("search/search", {
    pesquisaUsuario,
      artigos,
      totalResults: totalResults
    })

    if (error) {
        return res.render("search/search", {
          pesquisaUsuario,
          error,
      });
    }
  }
);


app.listen(PORT, () => {
    console.log(`🟢 Bem vindo! O portal do CAPES está ONLINE!\nPorta de acesso: ${PORT}`);
});
