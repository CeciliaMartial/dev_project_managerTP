//const createError = require('http-errors');
const express = require('express');
const { connectDB } = require('./config/database');
const PORT = process.env.PORT || 3030;
const path = require('twig');
const app = express();
//const cookieParser = require('cookie-parser');
// const logger = require('morgan');

//const indexRouter = require('./routes/index');

// Importation du fichier de route user.js
const usersRouter = require('./routes/users');

//importer le modele user
const User = require('./models/User');

// Connexion à la base de données
connectDB();
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', '.views');
app.set('view engine', 'twig');
app.set('views', './views');
app.use(express.static('public'));
//Ajouter le middleware 'body-parser'
app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
// catch 404 and forward to error handler

// app.use(logger('dev'));
 app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/', usersRouter);

//configuration des routes
app.get('/', (req, res) => {
  res.render('pages/home.twig',{title:"TP PROJECT MANAGER DE CECILIA"});
});
    // Utilisation des routes définies dans user.js
    app.use('/', usersRouter);

app.listen(5555, () => {
	console.log(`🚀🚀 Lancement avec succès du server`);
});

module.exports = app;

// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });