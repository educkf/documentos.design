const keystone = require('keystone');
const { Types } = keystone.Field;

/**
 * Type Model
 * ==================
 */

const Type = new keystone.List('Type', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Type.add({
	name: { type: String, required: true },
  description: { type: String },
  slug: { type: String, required: true, default: '-' }
});

Type.register();