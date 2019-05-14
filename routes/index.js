const keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
const { Nuxt, Builder } = require('nuxt');

const config = {
  ...require('../nuxt.config'),
  dev: process.env.NODE_ENV !== 'production'
};

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	api: importRoutes('./api')
};

const nuxt = new Nuxt(config);

exports = module.exports = function(app) {

  // add an API endpoint for signing in _before_ your protected routes
	app.post('/api/v1/signin', routes.api.auth.signin);
  app.post('/api/v1/signout', routes.api.auth.signout);

  app.get('/api/v1/users', routes.api.auth.checkAuth, keystone.middleware.api, routes.api.users.list);
  app.get('/api/v1/users/:id', routes.api.auth.checkAuth, keystone.middleware.api, routes.api.users.get);
  app.post('/api/v1/users', keystone.middleware.api, routes.api.users.create);
  app.post('/api/v1/users/:id', routes.api.auth.checkAuth, keystone.middleware.api, routes.api.users.update);
  app.delete('/api/v1/users/:id', routes.api.auth.checkAuth, keystone.middleware.api, routes.api.users.remove);  
  
  app.get('/api/v1/posts', keystone.middleware.api, routes.api.posts.list);
	app.get('/api/v1/posts/:id', keystone.middleware.api, routes.api.posts.get);
  app.post('/api/v1/posts', routes.api.auth.checkAuth, keystone.middleware.api, routes.api.posts.create);
  app.post('/api/v1/posts/:id', routes.api.auth.checkAuth, keystone.middleware.api, routes.api.posts.update);
  app.delete('/api/v1/posts/:id', routes.api.auth.checkAuth, keystone.middleware.api, routes.api.posts.remove); 

  app.get('/api/v1/doc_collections', keystone.middleware.api, routes.api.doc_collections.list);
	app.get('/api/v1/doc_collections/:slug', keystone.middleware.api, routes.api.doc_collections.get);
  app.post('/api/v1/doc_collections', routes.api.auth.checkAuth, keystone.middleware.api, routes.api.doc_collections.create);
  app.post('/api/v1/doc_collections/:id', routes.api.auth.checkAuth, keystone.middleware.api, routes.api.doc_collections.update);
  app.delete('/api/v1/doc_collections/:id', routes.api.auth.checkAuth, keystone.middleware.api, routes.api.doc_collections.remove); 

  app.use(nuxt.render)

  // Enable live build & reloading on dev
  if (nuxt.options.dev) {
    new Builder(nuxt).build();
  }
}
