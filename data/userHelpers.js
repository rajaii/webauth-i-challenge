const db = require('./db-config.js');


  module.exports = {
    add,
    find,
    findBy,
    findById,
  };
  
  function find() {
    return db('users');
  }
  
  function findBy(filter) {
    return db('users').where(filter);
  }
  
  function add(user) {
    return db('users')
      .insert(user);
    
  }
  
  function findById(id) {
    return db('users')
      .where({ id })
      .first();
  }