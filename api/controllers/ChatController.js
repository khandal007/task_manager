/**
 * ChatController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var moment = require('moment');
module.exports = {
	createMessage: async function(req, res){
    	const params =_.extend(req.params|| {}, req.query || {}, req.body || {})

    	var chat = await Chat.create({message: params.message, userId: req.session.userId, projectId: params.projectId, sendTime: moment().format() }).fetch();
    	var findchat = await Chat.find({projectId: params.projectId});

    	var qry = `SELECT id FROM teamMember WHERE name IN (SELECT teamMember FROM tMember where projectId = ${params.projectId}) AND id NOT IN (${req.session.userId})`;
    	var result = await sails.sendNativeQuery(qry);

    	if(req.session.userId != 1){
    		userIds = ['1USER'];
    	} else {
    		userIds = [];	
    	}
    	

    	await result.rows.map(async function(item, idx){
    		userIds.push(item.id+'USER');
    	});

    	if(chat){
           await socket.sendReqData(params.projectId, 'messageReceived', params.projectId, async function function_name(resData){ 
            console.log("excelRollBack out");
                    console.log(userIds);
	            	await socket.sendReqData(userIds, 'allusermessageReceived', params.projectId, async function function_name(resData){ 
	            	});
            	
            return res.json({ 'status': 'success', 'messages': 'success'})
           });
    	} else {
    	   return res.json({ 'status': 'error', 'messages': 'fail'})
    	}
    },

	findMessage: async function(req, res){
    	const params =_.extend(req.params|| {}, req.query || {}, req.body || {})

    	var qry =`SELECT c.message, c.sendTime, c.userId, c.id, tm.username, tm.name, pd.name  
				FROM chat as c
				LEFT JOIN teamMember as tm ON c.userId= tm.id
				LEFT JOIN pDetails as pd ON pd.id = c.projectId
				WHERE c.projectId = ${params.projectId} ORDER BY c.id`;

    	//var findchat = await Chat.find({projectId: params.projectId}).populate('teamMember');
    	var result = await sails.sendNativeQuery(qry);
    	if(result.rows.length > 0) {

    		result.rows.map( function (item, idx ){
    			if(item.userId == req.session.userId){
    				item['isSenderYou'] = 1;
    			} else {
    				item['isSenderYou'] = 0;
    			}

    			if(result.rows.length == (idx+1)){
                  return res.json({ 'status': 'success', 'messages': 'success', showmessage: result.rows});
    			}
    		});

    	} else{
    		return res.json({ 'status': 'error', 'messages': 'fail', showmessage: []});
    	}
    },

    subscribeProject: function(req, res){
	  	if(!req.isSocket){
	  		return res.badRequest();
	  	}
  	    var roomName = req.param('roomName');
            sails.sockets.join(req ,roomName , function(err){
        if(err){
          return res.serverError(err);
          }
          return res.json({message:'subscribed to a fun room called '+roomName+'!' });
        });	
    },

};

