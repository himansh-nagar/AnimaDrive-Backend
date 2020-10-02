
exports.up = function(knex) {
    return knex.schema.createTable("cart",(table)=>{
      table.increments().primary();
      table.integer('price').notNullable();
      table.integer('quantity').notNullable();
      table.integer('total_price').notNullable();
      table.string('thumnail').notNullable();
      table
          .integer('product_id')
          .references('id')
          .inTable('products');
      table
          .integer('customer_id')
          .references('id')
          .inTable('customers')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("cart");
  };
