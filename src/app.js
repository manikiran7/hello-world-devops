const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const pool = require("./db/database");
const userRoutes = require("./routes/users");

const app = express();

app.use(cors());
app.use(express.json());

// Liveness probe
app.get("/api/health", (_req, res) => {
	res.json({
		status: "ok",
	});
});

// Readiness probe
app.get("/api/ready", async (_req, res) => {
	try {
		await pool.query("SELECT 1");

		res.json({
			status: "ready",
		});
	} catch (error) {
		console.error("Database is not ready:", error);

		res.status(503).json({
			status: "not ready",
		});
	}
});

app.use("/api/users", userRoutes);

module.exports = app;
const readinessLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 30,
	standardHeaders: true,
	legacyHeaders: false,
});