/**
 * ApkController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var moment = require('moment');
module.exports = {

forApk: async function(req, res){
    const params = _.extend(req.params|| {}, req.query || {}, req.body || {})
    if(req.session.isactive != "1"){
    var allTeamMembers=[];
    var whereObj;
    if(req.session.userrole == "25"){
        whereObj = {where: {id: req.session.projectid,completed: "0"}};
    } else {
      whereObj ={id:params.id,completed: "0"};
    }
    var techFindAll = await PDetails.find(whereObj).populate('technology').populate('teamMember');
     var all_tech = await Technology.find();
	   var all_team = await TeamMember.find();
     //console.log(techFindAll)
    if(techFindAll.length > 0 ){
       techFindAll.map( async function(data, index){
        
        var teamMemberList = await TMember.find({projectId: data.id });
        var nameStr = '';
         teamMemberList.map( async function(item, index1){
          if(item.finished == "2"){
          nameStr += item.teamMember+'(done)'+',';
          if((index1+1) === teamMemberList.length){
            data.allTeamMembers = nameStr;
            setTimeout(1000);
          }

         }else{
          nameStr += item.teamMember+',';
          if((index1+1) === teamMemberList.length){
            data.allTeamMembers = nameStr;
          }
        }

        });
        
        var technologyList = await Tech.find({projectId: data.id });
        
        var techStr = '';
        technologyList.map( async function(item, index1){
          
          techStr += item.technology+',';
          if((index1+1) === technologyList.length){
            data.allTechnology = techStr;
            setTimeout(1000);
          }
          
        });
        function unflatten(techFindAll) {
      var tree = [],
          mappedArr = {},
          arrElem,
          mappedElem;

      // First map the nodes of the array to an object -> create a hash table.
      for(var i = 0, len = techFindAll.length; i < len; i++) {
        arrElem = techFindAll[i];
        mappedArr[arrElem.id] = arrElem;
        mappedArr[arrElem.id]['children'] = [];
      }


      for (var id in mappedArr) {
        if (mappedArr.hasOwnProperty(id)) {
          mappedElem = mappedArr[id];
          // If the element is not at the root level, add it to its parent array of children.
          if (mappedElem.parent_id) {
            mappedArr[mappedElem['parent_id']]['children'].push(mappedElem);
          }
          // If the element is at the root level, add it to first level elements array.
          else {
            tree.push(mappedElem);
          }
        }
      }
      return tree;
    }

var tree = unflatten(techFindAll);
//console.log(tree);
          
          if(index === (techFindAll.length-1)){

            return res.json({'status': 'success', 'messages': 'Successfully created!', data: tree, techData: all_tech, teamData: all_team, moment:moment});
         }
       });
    } else {
       return res.json({'status': 'fail', 'messages': 'Failed!', data: [], techData: [], teamData: []});
    }
}else {
            return res.json({'status': 'fail', 'messages': 'Failed!'});
           }
},
  

};

