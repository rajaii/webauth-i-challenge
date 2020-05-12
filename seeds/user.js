
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'ali', password: 'rowValue1'},
        {username: 'joe', password: 'rowValue2'},
        {username: 'laksjf', password: 'rowValue3'}
      ]);
    });
};
