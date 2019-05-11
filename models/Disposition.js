const keystone = require('keystone');
const { Types } = keystone.Field;

/**
 * Disposition Model
 * ==================
 */

const Disposition = new keystone.List('Disposition', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Disposition.add({
	name: { type: String, required: true },
  description: { type: String },
  doc_collection: { type: Types.Relationship, ref: 'DocCollection', index: true },
});

Disposition.register();