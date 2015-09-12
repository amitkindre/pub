var sub_key = 'sub-c-1079ec36-328a-11e5-8ac6-02ee2ddab7fe';
var pub_key = 'pub-c-7b6d4ce7-d435-414b-a476-10bf18cf8784';
var pub_channel = "Channel-dkjt2q43n";
var sub_channel = "Channel-dkjt2q43m"
//var trycatch = require('trycatch');
var event = require('events');
var eventEmitter = new event.EventEmitter();

var pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP
    publish_key   : pub_key,
    subscribe_key : sub_key
});
var err;
var count=0;
function pub(){
	pubnub.publish({
		channel		:	pub_channel,
		publish_key	:	pub_key,
		message		:	{"Count" : count},
		callback	:	function(m){console.log(m);setTimeout(pub,1000);count++;},
		error		:	function(){console.log('Offline'); err = setTimeout(pub,5000);}
	});
}



setTimeout(pub,1000);
process.on('uncaughtException',function(){
	console.log('uncaughtException');
	clearTimeout(err);
	setTimeout(pub,10000);
})
