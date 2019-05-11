const keystone = require('keystone');
const { Types } = keystone.Field;

/**
 * DocCollection Model
 * ==================
 */

const DocCollection = new keystone.List('DocCollection', {
	autokey: { from: 'name', path: 'key', unique: true }
});

DocCollection.add({
	name: { type: String, required: true },
  description: { type: String },
  owner: { type: Types.Relationship, ref: 'User', index: true },
});

DocCollection.relationship({ ref: 'Post', path: 'categories' });

DocCollection.register();