exports.up = function(knex, Promise) {
  return knex.schema.table('comments', table => {
    table.string('avatar');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('comments', table => table.dropColumn('avatar'));
};
