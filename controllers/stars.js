const Thing = require('../models/thing');

exports.createThing = (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
      
  };


  exports.getAllThing = (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
      
  
  };

  exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({_id:req.params.id})
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
    };

  
    exports.getAllThingByUser = (req, res, next) => {
      Thing.find({user:req.params.user})
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
      };
  