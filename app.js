var express = require('express');
const { connectDB } = require('./config/database');
const PORT = process.env.PORT || 5555;
const twig = require ('twig');
var app = express();

 // Importation du fichier de route user.js
 const userRoutes = require('./routes/user');

//importer le modele user
const User = require('./models/User');
// Connexion à la base de données
connectDB();
// configuration du moteur de template (twig)
app.set('view engine', 'twig');
app.set('views', './views');
app.use(express.static('public'));

//Ajouter le middleware 'body-parser'
app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

// configuration des routes
app.get('/', (req, res) => {
  res.render('pages/home.twig',{title:"du tp de Cécilia"});
});
    // Utilisation des routes définies dans user.js
    app.use('/', userRoutes);

// app.get('/register', (req, res) => {
//   res.render('pages/register');
// });

//Ajouter la route 'register'
// app.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;
//   const newUser = new User({ username, email, password });
//   await newUser.save();
//   res.redirect('showusers');
// });

// app.get('/showusers', async (req, res) => {
//   const users = await User.find({});
//   res.render('pages/showusers', { users });
// });
app.listen(5555, () => {
	console.log(`🚀🚀 Lancement avec succès du server`);
});

module.exports = app;