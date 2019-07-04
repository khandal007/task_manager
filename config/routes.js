/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  '/home': {view: 'pages/home'},
  '/login': {view: 'pages/login'},
  'GET /userlist': {action: 'TeamMember/findTeamMember'},
  'GET /users': { action: 'TeamMember/findskill' },
  'GET /putDetails': {action: 'PDetails/showDetails'},
  '/editDetails': { action: 'PDetails/editDetails'},
  '/editUser': { action: 'TeamMember/editTeamMember'},
  'GET /home':   {action: 'PDetails/findTech'},
  'GET /skill':  {action: 'Technology/findTechnology'},
  


  'POST /pDetails/create':                    {action: 'PDetails/createDetails'},
  'GET /pDetails/show':                       {action: 'PDetails/showDetails'},
  'GET /pDetails/delete':                     {action: 'PDetails/dumpedP'},
  'PUT  /pDetails/update':                    {action: 'PDetails/updateDetails'},
  'GET  /pDetails/edit':                      {action: 'PDetails/editDetails'},
  'POST /technology/create':                  {action: 'Technology/createTechnology'},
  'DELETE /technology/delete':                {action: 'Technology/deleteTechnology'},
  'POST /teamMember/create':                  {action: 'TeamMember/createTeamMember'},
  'PUT  /teamMember/update':                  {action: 'TeamMember/updateTeamMember'},
  'PUT /teamMember/finished':                 {action: 'TeamMember/finished'},
  'GET  /teamMember/find':                    {action: 'TeamMember/findskill'},
  'GET  /pDetails/findtech':                  {action: 'PDetails/findTech'},
  'GET  /pDetails/completed':                 {action: 'PDetails/completeP'},
  'GET  /login/find':                         {action: 'Login/findUser'},
  'GET  /apk/find':                           {action: 'Apk/forApk'},
  'GET  /team/find':                          {action: 'TeamMember/findTeamMember'},
  'GET  /team/edit':                          {action: 'TeamMember/editTeamMember'},
  'GET  /tech/find':                          {action: 'Technology/findTechnology'},
  '/home/logout':                             {action: 'logout'},

  'POST /message/create':                     {action: 'Chat/createMessage'},
  'GET  /message/find':                       {action: 'Chat/findMessage'},
  'GET  /subscribeToRoom':                    {action: 'Chat/subscribeProject'},        
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
