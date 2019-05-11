const keystone = require('keystone');
require('dotenv').config();

// Configuration
const config = {
  name: 'Documentos.Design',
  secret: process.env.SECRET,
  mongo: process.env.MONGO_DB,
  autoUpdate: 'false',
  port: process.env.PORT
}

keystone.init({
  'name': config.name,
  'brand': config.name,
  'mongo': config.mongo,
  'auto update': true,
	'session': true,
	'auth': true,
  'user model': 'User',
  'cookie secret': config.secret,
  'auto update': config.autoUpdate,
  'port': config.port
})

// Models
keystone.import('models')

// Routes
keystone.set('routes', require('./routes'))

// Start KeystoneJS
keystone.start()
