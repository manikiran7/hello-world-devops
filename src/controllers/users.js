const userService = require("../services/users");

async function createUser(req, res) {
	try {
		const { name, email } = req.body;

		if (!name || !email) {
			return res.status(400).json({
				message: "Name and email are required",
			});
		}

		const user = await userService.createUser(name, email);

		return res.status(201).json(user);
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			message: "Failed to create user",
		});
	}
}

async function getUsers(_req, res) {
	try {
		const users = await userService.getUsers();

		return res.status(200).json(users);
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			message: "Failed to fetch users",
		});
	}
}

module.exports = {
	createUser,
	getUsers,
};
