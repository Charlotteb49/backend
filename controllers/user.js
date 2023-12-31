const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../models/User');

exports.signup = (req, res, next ) => {
bcrypt.hash(req.body.password, 10)
.then(hash => {
    const user = new User({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        family_name: req.body.family_name,
        username: req.body.username
    })
    
    user.save()
  .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
  .catch(error => {
    if (error.code === 11000) {
      // Handle duplicate key error (e.g., for unique fields like email or username)
      res.status(400).json({ message: 'ERROR 11000 with indexes on MONGODB' });
    } else {
      // Handle other errors
      console.error('Error saving user:', error);
      res.status(400).json({ error });
    }
  });
})
.catch(error => res.status(500).json({error}))
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
                        )
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
  // Assuming the user's ID is included in the request headers or token payload
  const token = req.headers.authorization; // Assuming the token is in the 'Authorization' header

  // Check if a token is present
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify and decode the token to get the user's ID
  jwt.verify(token, 'YOUR_SECRET_KEY', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const userId = decoded.userId; // Extracted user ID from the decoded token

    // Fetch the user's information based on the extracted user ID
    User.findById(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
      })
      .catch(error => res.status(500).json({ error }));
  });
};


exports.getAllUsers= (req, res, next) => {
    User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
};
