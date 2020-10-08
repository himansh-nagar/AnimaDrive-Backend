
exports.up = function(knex) {
    return knex.schema
    .createTable('orders', function(table) {
        table.increments().primary();
        table.string('firstName', 255);
        table.string('lastName', 255);
        table.string('email', 255);
        table.string('address', 1024).notNullable();
        table.integer('pincode').notNullable();
        table.string('country', 255).notNullable();
        table.string('payment_method', 255).notNullable();
        table.integer('total_amount').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.text('cart');
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
    return knex.schema.dropTable("orders")
};
