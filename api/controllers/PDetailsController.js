/**
 * PDetailsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var moment = require('moment');
module.exports = {

	createDetails: async function(req, res){
    const params =_.extend(req.params|| {}, req.query || {}, req.body || {})
    if(typeof(params.teamMember) != 'object'){
      var setArray= [];
      setArray.push(params.teamMember);
      params.teamMember = setArray;
      
    }

    if(typeof(params.technology) != 'object'){
      var setArray= [];
      setArray.push(params.technology);
      params.technology = setArray;
      
    }

    var pDetails = await PDetails.create({name: params.name, details: params.details,
    	    startDate: params.startDate ,endDate: params.endDate, release: params.release, parent_id: (params.parent_id)?params.parent_id:null}).fetch();
	   var all_tech = await Technology.find();
	   var all_team = await TeamMember.find();

     if(pDetails){
      var  project_id = pDetails.id;
      params.teamMember.map(async function(item, index){
          var pDetails = await TMember.create({projectId: project_id , teamMember: item}).fetch();
          //console.log(pDetails.teamMember);
      })
    }

    if(pDetails){
      var  project_id = pDetails.id;
      params.technology.map(async function(item, index){
          var pDetails = await Tech.create({projectId: project_id , technology: item}).fetch();
          //console.log(pDetails.technology);
      })
    }
    

	    if(pDetails && all_tech){
	  
	      res.json({'status': 'success', 'messages': 'Successfully created!', data: pDetails, techData: all_tech, teamData: all_team});

	    } else {
	      res.json({ 'status': 'error', 'messages': 'fail', data: [], techData: all_tech});
	    }
  },

  showDetails: async function(req, res){
    const params =_.extend(req.params|| {}, req.query || {}, req.body || {})
    //console.log(params.id);
     var pDetails = await PDetails.find({});
	   var all_tech = await Technology.find();
	   var all_team = await TeamMember.find();
        console.log("hi",params.stDate);
	    if(pDetails && all_tech){
	  
	      res.view('pages/putDetails',{data: params.id, techData: all_tech, teamData: all_team});
	    } else {
	      res.view( 'pages/putDetails', {data: [], techData: all_tech});
	    }
  },

  findTech: async function(req, res){
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
        
        data['label'] = data.name;
        
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
        if(req.session.userrole == '25'){
          if(index === (techFindAll.length-1)){
            console.log("iron man login");
            return res.view('pages/home',{ data: techFindAll, techData: all_tech, teamData: all_team, moment:moment});
            }
            }
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
console.log(tree);
          if(req.session.userrole == '35'){
          if(index === (techFindAll.length-1)){
            console.log("iron man login");
            return res.view('pages/home',{ data: tree, techData: all_tech, teamData: all_team, moment:moment});
            }
            }
            
       });
    } 
    else {
       return res.view('pages/home', { data: [], techData: [], teamData: []});
         }
    }else {
            return res.view('pages/login');
        }
},

  completeP: async function(req, res){
    const params = _.extend(req.params|| {}, req.query || {}, req.body || {})
      
    var allTeamMembers=[];
    var whereObj;

    var completeFindAll = await PDetails.find({id:params.id,completed: "55"}).populate('technology').populate('teamMember').populate('parent_id');
     var all_tech = await Technology.find();
     var all_team = await TeamMember.find();
     //console.log(completeFindAll)
    if(completeFindAll.length > 0 ){
      console.log("google");
       completeFindAll.map( async function(data, index){
        
        var teamMemberList = await TMember.find({projectId: data.id });
        
        var nameStr = '';
        teamMemberList.map( async function(item, index1){
          
          nameStr += item.teamMember+',';
          if((index1+1) === teamMemberList.length){
            data.allTeamMembers = nameStr;
          }
          
        });
        
        var technologyList = await Tech.find({projectId: data.id });
        
        var techStr = '';
        technologyList.map( async function(item, index1){
          
          techStr += item.technology+',';
          if((index1+1) === technologyList.length){
            data.allTechnology = techStr;
          }
            });
        
          if(index === (completeFindAll.length-1)){
             if(req.session.userId != null){
               //console.log(completeFindAll);
            return res.view('pages/home', {data: completeFindAll, techData: all_tech, teamData: all_team, moment:moment});
           }
           else {
            return res.view('pages/login');
           }
          }
       });
    } else {
       return res.view('pages/home', {data: [], techData: [], teamData: []});
    }
},

  dumpedP: async function(req, res){
    const params = _.extend(req.params|| {}, req.query || {}, req.body || {})
      
    var allTeamMembers=[];
    var whereObj;

    var deleteFindAll = await PDetails.find({id:params.id,completed: "45"}).populate('technology').populate('teamMember').populate('parent_id');
     var all_tech = await Technology.find();
     var all_team = await TeamMember.find();
     //console.log(deleteFindAll)
    if(deleteFindAll.length > 0){
      console.log("hello hi");
       deleteFindAll.map( async function(data, index){
        
        var teamMemberList = await TMember.find({projectId: data.id });
        
        var nameStr = '';
        teamMemberList.map( async function(item, index1){
          
          nameStr += item.teamMember+',';
          if((index1+1) === teamMemberList.length){
            data.allTeamMembers = nameStr;
          }
          
        });
        
        var technologyList = await Tech.find({projectId: data.id });
        
        var techStr = '';
        technologyList.map( async function(item, index1){
          
          techStr += item.technology+',';
          if((index1+1) === technologyList.length){
            data.allTechnology = techStr;
          }
          
        });
          
          if(index === (deleteFindAll.length-1)){
             if(req.session.userId != null){
            return res.view('pages/home', {data: deleteFindAll, techData: all_tech, teamData: all_team, moment:moment});
           }
           else {
            return res.view('pages/login');
           }
          }
       });
    } else {
      console.log("hello");
       return res.view('pages/home', {data: [], techData: [], teamData: []});
    }
},

//   deleteDetails: async function(req, res){
//   const params = _.extend(req.params|| {}, req.query || {}, req.body || {})

// var burnedBook = await PDetails.destroy({id: params.id});
// var burnedBook1 = await TMember.destroy({projectId: params.id});
// var burnedBook2 = await Tech.destroy({projectId: params.id});

// if (burnedBook) {
//   return res.json({'status': 'success', data: burnedbook});
//   sails.log('Deleted!');
// } else {
//   sails.log('The database does not have !');
// }
// },

editDetails: async function(req, res){
    const params = _.extend(req.params|| {}, req.query || {}, req.body || {})
      //console.log("hi");
      var x = await TMember.find({ where: { projectId: params.id }});
      var y = await Tech.find({ where: { projectId: params.id }});
    var detailsFindAll = await PDetails.find({ where: { id: params.id }}).populate('tMember');
      var all_tech = await Technology.find();
	   var all_team = await TeamMember.find();
    //console.log("Policy",detailsFindAll);
    

    if(detailsFindAll[0]){
       res.view('pages/editDetails', {data: detailsFindAll[0],techData: all_tech, teamData: all_team,data1: x,data2: y, moment:moment});
    } else {
       res.view('pages/editDetails', {data: []});
    }
    

},

  updateDetails: async function(req, res){
    const params =_.extend(req.params|| {}, req.query || {}, req.body || {})

if(! params.id){
  return res.json({'status': 'error', 'messages': 'Provide id!'});
}
  var all_tech = await Technology.find();
  var all_team = await TeamMember.find();
    var detailsput = await PDetails.update({ id: params.id })
       .set({
          name: params.name,
          details: params.details,
          startDate: params.startDate,
          endDate: params.endDate,
          cost: params.cost,
          release: params.release,
          completed: params.completed
         /* teamMember: params.teamMember,
          technology: params.technology*/
        });
        console.log(params.completed);
      
      var project_id= params.id
      var detailsput = await TMember.destroy({projectId: project_id})
      var detailsput = await Tech.destroy({projectId: project_id})   

    if(typeof(params.teamMember) != 'object'){
      var setArray= [];
      setArray.push(params.teamMember);
      params.teamMember = setArray;
      
    }

    if(typeof(params.technology) != 'object'){
      var setArray= [];
      setArray.push(params.technology);
      params.technology = setArray;
      
    }
      
      params.teamMember.map(async function(item, index){
          var detailsput = await TMember.create({projectId: project_id , teamMember: item}).fetch();
          console.log(pDetails.teamMember);
      })
    

    
      params.technology.map(async function(item, index){
          var detailsput = await Tech.create({projectId: project_id , technology: item}).fetch();
          console.log(detailsput.technology);
      })


             
    if( detailsput ){
      return res.json({'status': 'success', 'messages': 'Successfully created!', data: detailsput,
                           techData: all_tech, teamData: all_team });
    }else{
      return res.json({'status': 'error', 'messages': 'failed!', data: detailsput});
    }
  },

};

