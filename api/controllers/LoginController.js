/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  

  		findUser: async function(req, res, callback){
    const params =_.extend(req.params|| {}, req.query || {}, req.body || {})

     var userFindAll = await TeamMember.findOne({

     		 where: {username: params.username}
     });

     await sails.helpers.passwords.checkPassword(params.password, userFindAll.password).intercept('incorrect', () => {return res.json({ status:"error", message:"incorrect password"});
        });
     
    if(userFindAll){
        sails.log('Found');
    } 
    else {
        sails.log('Could not find user , sorry.');
    }

    console.log(params.password);
    //console.log(userFindAll);
     
     
       
       req.session.authenticated = true;
       req.session.userId = userFindAll.id;
       req.session.name = userFindAll.name;
       req.session.username = userFindAll.username;
       req.session.userrole = userFindAll.userRole;
       req.session.isactive = userFindAll.isActive;

       console.log(req.session.userId);
        console.log(req.session.name);
        console.log(req.session.userrole);

        
       var tmemberFindAll = await TMember.find({

             where: {teamMember: req.session.name}
     });
       // console.log(tmemberFindAll);
          var projectid=[];
         
         for(var i=0; i < tmemberFindAll.length; i++){
         
         	projectid.push(tmemberFindAll[i].projectId);
         }
         req.session.projectid = projectid;
        console.log(req.session.projectid);
   			
        if(tmemberFindAll){
        return res.json({ status:"success", message:"logged in!"/*, token: token*/});
        }
        
   			/*if(req.session.projectid == []){
   				alert("You have no projects");

   			}*/     
},

};

