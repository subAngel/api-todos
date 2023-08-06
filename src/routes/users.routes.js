const express = require("express");
const UsersService = require("../services/users.service");

const router = express.Router();
const service = new UsersService();

router.get("/", (req, res) => {
	const users = service.findAll();
	res.json(users);
});

router.get("/:id", (req, res) => {
	const { id } = req.params;
	const user = service.findOne(id);
	res.json(user);
});

router.post("/", (req, res) => {
	const body = req.body;
	const newUser = service.create(body);
	res.json({
		message: "created user",
		newUser,
	});
});

router.patch("/:id", (req, res) => {
	const { id } = req.params;
	const body = req.body;
	const userModified = service.update(id, body);
	res.json({
		message: "updated",
		userModified,
	});
});

router.delete("/:id", (req, res) => {
	const { id } = req.params;
	const response = service.delete(id);
	res.json({
		message: "deleted",
		response,
	});
});

module.exports = router;
