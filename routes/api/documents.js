var keystone = require('keystone');
var Document = keystone.list('Document');
// var DocumentCategory = keystone.list('DocumentCategory');

/**
 * List Documents
 */
exports.list = async function(req, res) {

	Document.model.find(async function(err, items) {
		
		if (err) return res.apiError('database error', err);

		// for (let [index, item] of items.entries()) {
		// 	for (let [var_index, category] of item.categories.entries()) {

		// 		const DocRelMetadata = [ 'DocCollection', 'Storage', 'Disposition', 'Type', 'Species', 'Support', 'Subjects', 'User']

		// 		await DocumentCategory.model.findById(category).exec(function(err, category_data) {
		// 			if (err) return res.apiError('database error', err);
		// 			items[index]['categories'][var_index] = category_data
		// 		})
		// 	}
		// }
		
		res.apiResponse({
			documents: items
		});
		
	});
}

/**
 * Get Document by ID
 */
exports.get = async function(req, res) {
	Document.model.findById(req.params.id).exec(async function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');

		// for (let [index, category] of item.categories.entries()) {

		// 	await DocumentCategory.model.findById(category).exec(function(err, category_data) {
		// 		if (err) return res.apiError('database error', err);
		// 		item['categories'][index] = category_data

		// 	})

		// }
		
		res.apiResponse({
			document: item
		});
		
	});
}


/**
 * Create a Document
 */
exports.create = function(req, res) {
	
	var item = new Document.model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			document: item
		});
		
	});
}

/**
 * Get Document by ID
 */
exports.update = function(req, res) {
	Document.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = (req.method == 'POST') ? req.body : req.query;
		
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			res.apiResponse({
				document: item
			});
			
		});
		
	});
}

/**
 * Delete Document by ID
 */
exports.remove = function(req, res) {
	Document.model.findById(req.params.id).exec(function (err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		item.remove(function (err) {
			if (err) return res.apiError('database error', err);
			
			return res.apiResponse({
				success: true
			});
		});
		
	});
}