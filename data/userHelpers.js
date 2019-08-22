const db = require('./db-config.js');
/*
module.exports = {
    getUsers,
    postUser,
    findById,
    //findby
}

function getUsers() {
    return db('users');
}

function postUser(user) {
    return db('users')
      .insert(user, 'id')
      .then(ids => {
        const [id] = ids;
        return findById(id);
      });
  }

  function findById(id) {
    return db('users')
      .where({ id })
      .first();
  }*/

  module.exports = {
    add,
    find,
    findBy,
    findById,
  };
  
  function find() {
    return db('users').select('id', 'username', 'password');
  }
  
  function findBy(filter) {
    return db('users').where(filter);
  }
  
  function add(user) {
    return db('users')
      .insert(user)
      //.then(ids => {
       // const [id] = ids;
        //return findById(id);
      //});
  }
  
  function findById(id) {
    return db('users')
      .where({ id })
      .first();
  }