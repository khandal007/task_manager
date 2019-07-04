/**
 * TeamMember.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    tableName: "teamMember",
primaryKey: 'id',
 attributes: {
   id: {
     type: 'number',
     autoIncrement: true,
     columnType: 'bigint'
   },
   name: {
     type: 'string',
     required: true,
     columnType: 'varchar(50)'
   },
   username: {
      type: 'string',
      unique: true,
      columnType: 'varchar(20)'
   },
   skill: {
      model: 'Technology'
   },
   password: {
      type: 'string'
   },
   cost: {
      type: 'number',
      columnType: 'int'
   },
   teamMember:{
    collection:"Pdetails",
    via:"teamMember"
   },
   userRole:{
     type: 'number',
     columnType: 'tinyint'
   },
   isActive:{
     type: 'number',
     columnType: 'tinyint'
   }


    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

