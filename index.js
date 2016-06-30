var apiHelper = require('./apiHelper'),
pkgManager = require('./pkgManager'),
_ = require('underscore'),
player =  require('player'),
color = require('colorful');
_player  = {};

function login(account, cb){
	apiHelper.post('http://www.douban.com/j/app/login',{
		app_name : 'radio_android',
		version : 100,
		email : account.email;
		password : account.password;

	},function(err,res){
		var result = JSON.parse(res);
		if(result.r==0){
			cb(null,result);
		}
		else{
			 if (result.err == 'invalidate_email') {
                 console.log(color.red('抱歉，您的豆瓣帐号似乎出错了'));
             } else if (result.err == 'wrong_password') {
                console.log(color.red('抱歉，您的豆瓣密码似乎出错了'));
             }
         }
		}
	});
}


function getChannel(cb){
	apiHelper.get('http://www.douban.com/j/app/radio/channels', null, function(chns) {
		if(chns.channels && !chns.channels.length > 0){
			cb(null, chns.channels);
		}
		else{
			console.log("无法获取频道列表");
		}
	});
}

function getSong(channel, user, cb) {
	var params = {
		app_name : 'radio_android',
		version : 100,
		channel : channel.id,
		type : channel.type
	};
	if(user && typeof(user) === 'object' && user.token){
		params['user_id'] = user.user_id;
		params['expire'] = user.expire;
 		params['token'] = user.token;
	}
	apiHelper.get('http://www.douban.com/j/app/radio/people',params,function(result){
 		if (result.r == 0) {
			cb(null, result.song);
 		} 
 		else {
        	console.log(color.red(result.err));
        }
 	});
}



function play(err,songs){
	if(!err){
		if(_player.playing) player.stop(_player['playing']);
		if(songs.length > 0){
			var list = [];
			_.each(songs,function(item){
				list.push(player.add(item.url));
			});
			_player['playing'] = list[0];
			var song = songs[0];
 			console.log(color.yellow(song.albumtitle + ' ---- by ' + song.artist));
 			player.play(_player['playing'],function(){
				console.log('第一首歌播放完了'); 
			});
		}
	}
}


















