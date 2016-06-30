var fs = require('fs');

var pkgManager = {};

pkgManager.get = function(){
	return JSON.parse(fs.readFileSync(__dirname + '/config.json'))
}

pkgManager.set = function(param){
	if(param && typeof param ==='object'){
		fs.writeFileSync(__dirname+'/config.json', JSON.stringify(para));
		return true;
	}
	else{
		console.log("Error, not an object");
		return false;
	}
}


module.exports = pkgManager;
