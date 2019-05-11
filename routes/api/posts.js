var keystone = require('keystone');
var Post = keystone.list('Post');
var PostCategory = keystone.list('PostCategory');

/**
 * List Posts
 */
exports.list = async function(req, res) {

	Post.model.find(async function(err, items) {
		
		if (err) return res.apiError('database error', err);

		for (let [index, item] of items.entries()) {
			for (let [var_index, category] of item.categories.entries()) {

				await PostCategory.model.findById(category).exec(function(err, category_data) {
					if (err) return res.apiError('database error', err);
					items[index]['categories'][var_index] = category_data
				})
			}
		}
		
		res.apiResponse({
			posts: items
		});
		
	});
}

/**
 * Get Post by ID
 */
exports.get = async function(req, res) {
	Post.model.findById(req.params.id).exec(async function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');

		for (let [index, category] of item.categories.entries()) {

			await PostCategory.model.findById(category).exec(function(err, category_data) {
				if (err) return res.apiError('database error', err);
				item['categories'][index] = category_data

			})

		}
		
		res.apiResponse({
			post: item
		});
		
	});
}


/**
 * Create a Post
 */
exports.create = function(req, res) {
	
	var item = new Post.model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			post: item
		});
		
	});
}

/**
 * Get Post by ID
 */
exports.update = function(req, res) {
	Post.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = (req.method == 'POST') ? req.body : req.query;
		
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			res.apiResponse({
				post: item
			});
			
		});
		
	});
}

/**
 * Delete Post by ID
 */
exports.remove = function(req, res) {
	Post.model.findById(req.params.id).exec(function (err, item) {
		
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