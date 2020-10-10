exports.up = function (knex) {
  return knex.schema.createTable("cart", function (table) {
    table.increments().primary();
    table.string('product_name', 255);
    table.integer('price');
    table.string('thumbnail');
    table.integer('quantity');
    table
            .integer('product_id')
            .references('id')
            .inTable('products');
    table.integer("customer_id").references("id").inTable("customers");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cart");
};
