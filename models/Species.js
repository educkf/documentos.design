const keystone = require('keystone');
const { Types } = keystone.Field;

/**
 * Species Model
 * ==================
 */

const Species = new keystone.List('Species', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Species.add({
	name: { type: String, required: true },
  description: { type: String },
  slug: { type: String, required: true, default: '-' }
});

Species.register();