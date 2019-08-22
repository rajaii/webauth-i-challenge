
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments('id');
      tbl.text('username', 128)
        .unique()
        .notNullable();
      tbl.text('password', 128)
        .notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
