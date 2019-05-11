const keystone = require('keystone');
const { Types } = keystone.Field;

/**
 * Storage Model
 * ==================
 */

const Storage = new keystone.List('Storage', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Storage.add({
	name: { type: String, required: true },
  description: { type: String },
  doc_collection: { type: Types.Relationship, ref: 'DocCollection', index: true },
});

Storage.register();