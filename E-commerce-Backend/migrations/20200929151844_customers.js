
exports.up = function(knex) {
    return knex.schema
    .createTable('customers', function(table) {
        table.increments().primary()
        table.string('name', 255).notNullable();
        table.string('email', 255).unique().notNullable();
        table.string('password', 1024).notNullable();
        table.integer('phone_no').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable("customers")
};
