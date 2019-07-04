
/**
 * Socket
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var moment = require('moment');
module.exports = {

	sendReqData: async function(roomId, method, data, callback){
	  		sails.sockets.broadcast(roomId, method, data);
	  		callback("success");
	},
}