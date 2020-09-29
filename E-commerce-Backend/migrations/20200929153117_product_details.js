
exports.up = function(knex) {
    return knex.schema
    .createTable('product_details', function(table) {
        table.increments().primary();
        table.string('product_name', 255).notNullable();
        table.integer('price').notNullable();
        table.string('shot_desc', 255).notNullable();
        table.string('brief_desc', 2048).notNullable();
        table.string('thumnail').notNullable();
        table.string('img1', 1024).notNullable();
        table.string('img2', 1024).notNullable();
        table.string('img3', 1024).notNullable();
        table
            .integer('product_id')
            .references('id')
            .inTable('products');
        table.boolean('stock').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable("product_details")
};
