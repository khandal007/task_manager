/**
 * TechnologyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

	createTechnology: async function(req, res){
    const params =_.extend(req.params|| {}, req.query || {}, req.body || {})
    
    var techData = await Technology.create({name: params.name}).fetch();

    if(techData){
      return res.json({'status': 'success', 'messages': 'Successfully created!', techdata: techData});
    } else {
      return res.json({'status': 'error', 'messages': 'Successfully created!', techdata: []});
    }
  },
  
  findTechnology: async function(req, res){
    const params =_.extend(req.params|| {}, req.query || {}, req.body || {})

    var findTechnology = await Technology.find({});

    if(findTechnology.length >0){
      return res.view('pages/skill', {techd: findTechnology});
    }else{
      return res.view('pages/skill', {techd: []});
    }
  },

    deleteTechnology: async function(req, res){
    const params =_.extend(req.params|| {}, req.query || {}, req.body || {})

    var deletetech = await Technology.destroy({id: params.id});

    if(deletetech){
      return res.json({'status': 'Success'});
    }else{
      return res.json({'status': 'Failed'});
    }
  },

};

