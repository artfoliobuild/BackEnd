exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', table => {
    table.increments();
    table
      .string('username', 255)
      .notNullable()
      .unique();
    table.string('description');
    table.integer('likes').unsigned();
    table
      .string('image')
      .notNullable()
      .unique();
    table.integer('user_id').unsigned();
    table
      .foreign('user_id')
      .references('id')
      .on('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts');
};
