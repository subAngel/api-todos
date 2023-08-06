const express = require("express");
const UsersService = require("../services/users.service");

const router = express.Router();
const service = new UsersService();

router.get("/", async (req, res) => {
	try {
		const users = await service.findAll();
		res.json(users);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const user = await service.findOne(id);
		res.json(user);
	} catch (error) {
		return res.status(404).json({ message: error.message });
	}
});

router.post("/", async (req, res) => {
	try {
		const body = req.body;
		const newUser = await service.create(body);
		res.json({
			message: "created user",
			newUser,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

router.patch("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const body = req.body;
		const userModified = await service.update(id, body);
		res.json({
			message: "updated",
			userModified,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const response = await service.delete(id);
		res.json({
			message: "deleted",
			response,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

module.exports = router;
