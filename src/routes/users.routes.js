const express = require("express");
const UsersService = require("../services/users.service");

const router = express.Router();
const service = new UsersService();

router.get("/", async (req, res) => {
	const users = await service.findAll();
	res.json(users);
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const user = await service.findOne(id);
	res.json(user);
});

router.post("/", async (req, res) => {
	const body = req.body;
	const newUser = await service.create(body);
	res.json({
		message: "created user",
		newUser,
	});
});

router.patch("/:id", async (req, res) => {
	const { id } = req.params;
	const body = req.body;
	const userModified = await service.update(id, body);
	res.json({
		message: "updated",
		userModified,
	});
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const response = await service.delete(id);
	res.json({
		message: "deleted",
		response,
	});
});

module.exports = router;
