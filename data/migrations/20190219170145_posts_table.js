exports.up = function(knex, Promise) {
  return knex.schema.table('posts', table => {
    table.string('created_at').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('posts', table => table.dropColumn('created_at'));
};
