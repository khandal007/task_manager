/**
 * TeamMemberController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var _ = require('lodash');
module.exports = {

	createTeamMember: async function(req, res){
    const params =_.extend(req.params|| {}, req.query || {}, req.body || {})
     try{
      params.password = await sails.helpers.passwords.hashPassword(params.password);
      var teamData = await TeamMember.create({name: params.name, username: params.username, cost: params.cost,
        password: params.password, userRole: params.userRole}).fetch();

    if(typeof(params.skill) != 'object'){
      var setArray= [];
      setArray.push(params.skill);
      params.skill = setArray;
      
    }

    if(teamData){
      var  user_id = teamData.id;
      params.skill.map(async function(item, index){
          var teamData = await UserSkill.create({userId: user_id , skill: item}).fetch();
      })
      return res.json({'status': 'success', 'messages': 'Successfully created!', teamdata: teamData});
    } else {
      return res.json({'status': 'error', 'messages': 'Successfully created!', teamdata: []});
    }
    } catch(e){
      console.log(e);
    }
  },
  findTeamMember: async function(req, res){
    const params =_.extend(req.params|| {}, req.query || {}, req.body || {})
      var teamMembers = await TeamMember.find({});
      var technology = await Technology.find({});
      if(teamMembers){

       teamMembers.map( async function(data, index){
        
        var skillList = await UserSkill.find({userId: data.id});
        var techStr = '';
        skillList.map( async function(item, index1){
          
          techStr += item.skill+',';
          if((index1+1) === skillList.length){
            data.allskill = techStr;
          }
          
        });
          
          if(index === (teamMembers.length-1)){

        return res.view('pages/userList',{ tdata: teamMembers, all_tech: technology});
      }
    });

      }else{
        return res.view('pages/userList', {tdata: [],all_tech: []});
      }
},

  updateTeamMember: async function(req, res){
    const params =_.extend(req.params|| {}, req.query || {}, req.body || {})

        params.password = await sails.helpers.passwords.hashPassword(params.password);
        var updateteam = await TeamMember.update({ id: params.id })
       .set({
              cost: params.cost,
              password: params.password,
              isActive: params.isActive,

        });
       var technology = await Technology.find({});
       var user_id= params.id
       var updateteam = await UserSkill.destroy({userId: user_id})

       if(typeof(params.skill) != 'object'){
      var setArray= [];
      setArray.push(params.skill);
      params.skill = setArray;
      
    }
      
      params.skill.map(async function(item, index){
          var updateteam = await UserSkill.create({userId: user_id , skill: item, all_tec: technology}).fetch();
  
      })

       if(updateteam){
            return res.json({'status': 'success', 'messages': 'Successfully created!', updateteam: updateteam});
       } else {
            return res.json({'status': 'error', 'messages': 'Successfully created!', updateteam: []});
       }
  },
  
  findskill: async function(req, res){
    const params = _.extend(req.params|| {}, req.query || {}, req.body || {})

    var skillFindAll = await TeamMember.find({id: params.id}).populate('skill');
     var all_skill = await Technology.find();
    if(skillFindAll){
       return res.view('pages/users',{teamdata: skillFindAll, skillData: all_skill});
    } else {
       return res.view('pages/users', {teamdata: []});
    }

},
  
  finished: async function(req, res){
    const params = _.extend(req.params|| {}, req.query || {}, req.body || {})

      var naam = req.session.name;
      var finish = await TMember.update({ where:{projectId: params.id, teamMember: naam}})
            .set({finished: "2"}).fetch();
      if(finish){
        res.json({'status': 'success', 'messages': 'Successfully created!'});
      }
},

  editTeamMember: async function(req, res){
    const params = _.extend(req.params|| {}, req.query || {}, req.body || {})

    var user_skill = await UserSkill.find({ where: { userId: params.id }});
    var all_skill = await Technology.find();
    var editdetailsOne = await TeamMember.find({ where: { id: params.id }});
    if(editdetailsOne[0]){
       res.view('pages/editUser', {tdata: editdetailsOne[0] ,uskill: user_skill ,askill: all_skill});
    } else {
       res.view('pages/editUser', {tdata: []});
    }
},
};

