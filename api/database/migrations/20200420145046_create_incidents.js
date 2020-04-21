exports.up = (knex) => {
	return knex.schema.createTable('incidents',	(table) => {
			table.increments('id'),
			table.string('title').notNullable(),
			table.string('description').notNullable(),
			table.string('value').notNullable(),
			table.string('user_id').notNullable(),
			table.foreign('user_id').references('id').inTable('user')
	});
};

exports.down = (knex) => {
	return knex.schema.dropTable('incidents');
};
