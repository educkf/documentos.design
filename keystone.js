const keystone = require('keystone');
require('dotenv').config();

// Configuration
const config = {
  name: 'Keyuxt',
  secret: '2ffe3a0fc464e8f0e5f7fd0ac76644935e4e3ab5ae9f13878e63f5ec874fa9505361760398ecd1c32724d0a8f6dbcc7eb42ba03d412983e8400517d38fa1d700',
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
