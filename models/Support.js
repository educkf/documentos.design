const keystone = require('keystone');
const { Types } = keystone.Field;

/**
 * Support Model
 * ==================
 */

const Support = new keystone.List('Support', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Support.add({
	name: { type: String, required: true },
  description: { type: String },
  slug: { type: String, required: true, default: '-' }
});

Support.register();