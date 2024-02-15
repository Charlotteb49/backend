const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        family_name: req.body.family_name,
        username: req.body.username,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        admin: req.body.admin === "chapeau" ? true : false,
        score: 0
      });

      console.log('New user data:', user);

      user.save()
        .then(() => {
          console.log('User saved successfully');
          res.status(201).json({ message: 'Utilisateur créé' });
        })
        .catch(error => {
          if (error.code === 11000) {
            console.log('Duplicate key error:', error);
            res.status(400).json({ message: 'ERROR 11000 with indexes on MONGODB' });
          } else {
            console.error('Error saving user:', error);
            res.status(400).json({ error });
          }
        });
    })
    .catch(error => {
      console.error('Error hashing password:', error);
      res.status(500).json({ error });
    });
};


exports.login = (req, res, next ) => {
    User.findOne({email: req.body.email

    })
    .then(user => {
        if(user === null) {
            res.status(401).json({message: 'Paire identifiant mot de pass incorrect'})
         } else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    res.status(401).json({message: 'Paire identifiant mot de pass incorrect'})
                } else {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h'}
                        ),
                        user,
                    })
                }

            })
            .catch(error => {
                res.status(500).json({error})
            })
         }
    })
    .catch(error => res.status(500).json({error}))
    
};


exports.getAuthenticatedUser = (req, res, next) => {
  User.findOne({_id:req.params.id})
  .then(user => res.status(200).json(user))
  .catch(error => res.status(400).json({ error }))

};

exports.getUser = (req, res, next) => {
  User.findOne({username:req.params.username})
  .then(user => res.status(200).json(user))
  .catch(error => res.status(400).json({ error }))

};

exports.getAllUsers= (req, res, next) => {
    User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
};

exports.updateOneUser = (req, res, next) => {
  User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};
