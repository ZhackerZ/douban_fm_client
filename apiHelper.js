var pkgManager = require('./pkgManager'),
request  = require('request'),
_ = require('underscore');

var apiHelper = {};

apiHelper.get = function(url, params, cb){
	if(params!=null && typeof(params)===object){
		url += '?';
		_.each(params, function(value, key){
			url += '&' + key + '=' + value;
		});
	}
	request.get({
		url : url,
		json: true
	},function(err, res, body){
		if(!err && res.statusCode === 200){
			cb(body);
		}
	})
}

apiHelper.post = function(url, params, cb){
	request.post({
		url: url,
		form: params 
	},function(err, res, body){
		if(!err && res.statusCode === 200){
			cb(body);
		}
	})
}

module.exports = apiHelper;
