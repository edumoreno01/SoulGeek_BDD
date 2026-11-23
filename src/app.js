 const express = require('express');
 const app = express();
 const session = require('express-session');

 const methodOverride = require('method-override');
 
 app.use(methodOverride('_method'))
 
 const path = require('path');
 app.use(express.static(path.join(__dirname, 'views')));

 // Definindo o motor de views
 app.set("view engine", "ejs");
 app.set("views", __dirname + "/views");
 
 // Configurando middlewares
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 
app.use((req, res, next) => {
    const paginas = {
        '/': 'home',
        '/filmes': 'filmes',
        '/series': 'series',
        '/perfil': 'perfil',
        '/sobre': 'sobre',
        '/midias': 'midias',
        '/detalhes-filme': 'detalhes-filme'
    };

    res.locals.paginaAtual = paginas[req.path] || '';
    next();
});

 //const taskRoutes = require('./routes/taskRoute');
 const initialRoutes = require('./routes/initialRoute');
 const usuarioRoutes = require('./routes/usuarioRoute');
 const midiaRoutes = require('./routes/midiaRoute')
 const curtidosRoutes = require('./routes/curtidosRoute')
 app.use(session({
   secret: 'soulgeek-segredo',
   resave: false,
   saveUninitialized: false
}));
 app.use('/', initialRoutes);
 app.use('/usuarios', usuarioRoutes);
 app.use('/api/midias', midiaRoutes);
 app.use('/api/curtidos', curtidosRoutes);

 module.exports = app;
