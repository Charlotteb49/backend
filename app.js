const express = require('express');
const mongoose = require('mongoose');

const star = require('./models/star');


mongoose.connect('mongodb+srv://bouyercharlotte2:carotte1234@cluster0.jwayhdw.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true, 
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


 
app.post('/api/stars', (req, res, next) => {
  delete req.body._id;
  const star = new Star({
    name: req.body.name,
    description: req.body.description
  });
  star.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
    next();
});

app.use('/api/stars', (req, res, next) => {
  star.find()
    .then(stars => res.status(200).json(stars))
    .catch(error => res.status(400).json({ error }));
    next();

});



module.exports = app;