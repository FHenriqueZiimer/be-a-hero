exports.up = (knex) => {
  return knex.schema.createTable('user', (table) => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('number').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  })
};

exports.down = (knex) => {
  return knex.schema.dropTable('user');
};
