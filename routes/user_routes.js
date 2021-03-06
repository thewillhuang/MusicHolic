/*jshint node:true*/
'use strict';

var User = require('../models/user');

module.exports = function(app, passport) {
  app.get('/api/users',
    passport.authenticate('basic', {session: false}), function(req, res) {
      res.json({jwt: req.user.generateToken(app.get('jwtSecret'))});
    });

  app.post('/api/users', function(req, res) {
    User.findOne({'basic.email': req.body.email}, function(err, user) {
      if (err)
        return res.status(500).send('server error');
      if (user)
        return res.status(500).send('cannot create that user');
      if (!req.body.password)
        return res.status(500).send('must include a password');

      var check = /^\w+$/;
      if (!check.test(req.body.password))
        return res.status(500).send('password much be ' +
          'only letters and numbers');
      if (req.body.password.length < 6)
        return res.status(500).send('make a longer password');
      if (req.body.username === req.body.password)
        return res.status(500).send('passwords cannot match usernames');

      var newUser = new User();
      newUser.basic.email = req.body.email;
      newUser.basic.password = newUser.generateHash(req.body.password);
      newUser.save(function(err, data) {
        if (err)
          return res.status(500).send('server error');
        res.send({jwt: newUser.generateToken(app.get('jwtSecret'))});
      });
    });
  });
};
