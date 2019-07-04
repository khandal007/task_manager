/**
 * PDetails.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    tableName: "pDetails",
   primaryKey: 'id',
 attributes: {
   id: {
     type: 'number',
     autoIncrement: true,
     columnType: 'bigint'
   },
   parent_id:{
    model: 'PDetails'
   },
   name: {
     type: 'string',
     unique: true,
     columnType: 'varchar(50)'
   },
   details: {
     type: 'string',
     columnType: 'longtext'
   },
   teamMember: {
     model: 'TeamMember'

   },
   technology: {
     model: 'Technology'

   },
   startDate:{
     type: 'ref',
     columnType: 'date'
   },
   endDate:{
     type: 'ref',
     columnType: 'date'
   },
   release:{
     type: 'string',
     columnType: 'varchar(50)'
   },
   task:{
     collection: 'PDetails',
     via: 'parent_id'
   },
   tMember:{
    model:'TMember' 
   },
   tech:{
    model: 'Tech'
   },
   cost:{
      type: 'number',
      columnType: 'int'
   },
   completed:{
     type: 'number',
     columnType: 'tinyint'
   }
 },

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

};

