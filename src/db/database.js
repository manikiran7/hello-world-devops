const { Pool } = require("pg");

const pool = new Pool({
	host: process.env.DATABASE_HOST || "localhost",
	port: process.env.DATABASE_PORT || 5432,
	database: process.env.DATABASE_NAME || "hello_world",
	user: process.env.DATABASE_USER || "app",
	password: process.env.DATABASE_PASSWORD || "password",
});

module.exports = pool;
