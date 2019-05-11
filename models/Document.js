const keystone = require('keystone');
const { Types } = keystone.Field;

/**
 * Document Model
 * ==========
 */

const Document = new keystone.List('Document', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Document.add({
	title: { type: String, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  availability: { type: Types.TextArray, separator: '|' },
  code: { type: String, required: true, default: '-' },
  
  location: { type: String },
  language: { type: String },
  starting_year: { type: String },
  ending_year: { type: String },
  original: { type: Boolean },
  registration_technique: { type: String },

  pages: { type: String },
  duration: { type: String },
  format: { type: String },
  height: { type: String },
  width: { type: String },
  length: { type: String },
  
  doc_collection: { type: Types.Relationship, ref: 'DocCollection', index: true },
  storage: { type: Types.Relationship, ref: 'Storage', index: true },
  disposition: { type: Types.Relationship, ref: 'Disposition', index: true },
  type: { type: Types.Relationship, ref: 'Type', index: true },
  species: { type: Types.Relationship, ref: 'Species', index: true },
  support: { type: Types.Relationship, ref: 'Support', index: true },
  subjects: { type: Types.Relationship, ref: 'Subjects', index: true },

  description: { type: Types.Html, wysiwyg: true, height: 150 },
  preservation: { type: Types.Html, wysiwyg: true, height: 150 },
  comments: { type: Types.Html, wysiwyg: true, height: 150 },
  transcription: { type: Types.Html, wysiwyg: true, height: 150 },  

	author: { type: Types.Relationship, ref: 'User', index: true },
  publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } }
  
});


Document.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Document.register();