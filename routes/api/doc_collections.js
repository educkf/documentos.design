var keystone = require('keystone');
var DocCollection = keystone.list('DocCollection');
// var DocCollectionCategory = keystone.list('DocCollectionCategory');

/**
 * List DocCollections
 */
exports.list = async function(req, res) {

	DocCollection.model.find(async function(err, items) {
		
		if (err) return res.apiError('database error', err);

		// for (let [index, item] of items.entries()) {
		// 	for (let [var_index, category] of item.categories.entries()) {

		// 		const DocRelMetadata = [ 'DocCollection', 'Storage', 'Disposition', 'Type', 'Species', 'Support', 'Subjects', 'User']

		// 		await DocCollectionCategory.model.findById(category).exec(function(err, category_data) {
		// 			if (err) return res.apiError('database error', err);
		// 			items[index]['categories'][var_index] = category_data
		// 		})
		// 	}
		// }
		
		res.apiResponse({
			doc_collections: items
		});
		
	});
}

/**
 * Get DocCollection by ID
 */
exports.get = async function(req, res) {

	DocCollection.model.findOne({ key: req.params.slug } , async function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');

		// for (let [index, category] of item.categories.entries()) {

		// 	await DocCollectionCategory.model.findById(category).exec(function(err, category_data) {
		// 		if (err) return res.apiError('database error', err);
		// 		item['categories'][index] = category_data

		// 	})

		// }
		
		res.apiResponse({
			doc_collection: item
		});
		
	});
}


/**
 * Create a DocCollection
 */
exports.create = function(req, res) {
	
	var item = new DocCollection.model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			doc_collection: item
		});
		
	});
}

/**
 * Get DocCollection by ID
 */
exports.update = function(req, res) {
	DocCollection.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = (req.method == 'POST') ? req.body : req.query;
		
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			res.apiResponse({
				doc_collection: item
			});
			
		});
		
	});
}

/**
 * Delete DocCollection by ID
 */
exports.remove = function(req, res) {
	DocCollection.model.findById(req.params.id).exec(function (err, item) {
		
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