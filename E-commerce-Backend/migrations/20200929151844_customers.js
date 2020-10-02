
exports.up = function(knex) {
    return knex.schema
    .createTable('customers', function(table) {
        table.increments().primary()
        table.string('firstName', 255).notNullable();
        table.string('lastName', 255).notNullable();
        table.string('displayName', 255).notNullable();
        table.string('email', 255).unique().notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable("customers")
};
