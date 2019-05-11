const keystone = require('keystone');
const { Types } = keystone.Field;

/**
 * Subjects Model
 * ==================
 */

const Subjects = new keystone.List('Subjects', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Subjects.add({
	name: { type: String, required: true },
  description: { type: String },
  slug: { type: String, required: true, default: '-' }
});

Subjects.register();