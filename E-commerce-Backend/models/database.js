require('dotenv').config()

const knex = require("knex")({
    client: "pg",
    connection: {
      host: process.env.HOST ,
      user: process.env.PG_USER,
      password: process.env.PASSWORD ,
      database: process.env.DATABASE
    }
  });


  module.exports=knex;