const pool = require("../db/database");

async function createUser(name, email) {
	const result = await pool.query(
		`
        INSERT INTO users (name, email)
        VALUES ($1, $2)
        RETURNING id, name, email, created_at
        `,
		[name, email],
	);

	return result.rows[0];
}

async function getUsers() {
	const result = await pool.query(
		`
        SELECT id, name, email, created_at
        FROM users
        ORDER BY id DESC
        `,
	);

	return result.rows;
}

module.exports = {
	createUser,
	getUsers,
};
