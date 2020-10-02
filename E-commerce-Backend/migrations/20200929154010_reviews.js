
exports.up = function(knex) {
    return knex.schema
    .createTable('reviews', function(table) {
        table.increments().primary();
        table.string('comment', 255);
        table.integer('ratings');
        table
            .integer('product_id')
            .references('id')
            .inTable('products');
        table
            .integer('customer_id')
            .references('id')
            .inTable('customers');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("reviews")
};
