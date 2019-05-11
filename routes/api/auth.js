var keystone = require('keystone');

exports.signin = function(req, res) {
  
  if (!req.body.username || !req.body.password) return res.json({ success: false });
  
  keystone.list('User').model.findOne({ email: req.body.username }).exec(function(err, user) {
    
    if (err || !user) {
      return res.json({
        success: false,
        session: false,
        message: (err && err.message ? err.message : false) || 'Sorry, there was an issue signing you in, please try again.'
      });
    }
    
    keystone.session.signin({ email: user.email, password: req.body.password }, req, res, function(user) {
      
      return res.json({
        success: true,
        session: true,
        date: new Date().getTime(),
        userId: user.id,
        user: user
      });
      
    }, function(err) {
      
      return res.json({
        success: true,
        session: false,
        message: (err && err.message ? err.message : false) || 'Sorry, there was an issue signing you in, please try again.'
      });
      
    });
    
  });
}

// you'll want one for signout too
exports.signout = function(req, res) {
  keystone.session.signout(req, res, function() {
    res.json({ 'signedout': true });
  });
}

// also create some middleware that checks the current user

// as long as you're using Keystone's session management, the user
// will already be loaded if there is a valid current session

exports.checkAuth = function(req, res, next) {
  // you could check user permissions here too
  if (req.user) return next();
  return res.status(403).json({ 'error': 'no access' });
}