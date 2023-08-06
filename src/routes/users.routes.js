const express = require("express");
const UsersService = require("../services/users.service");

const router = express.Router();
const service = new UsersService();

router.get("/", async (req, res, next) => {
	try {
		const users = await service.findAll();
		res.json(users);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await service.findOne(id);
		res.json(user);
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const body = req.body;
		const newUser = await service.create(body);
		res.json({
			message: "created user",
			newUser,
		});
	} catch (error) {
		next(error);
	}
});

router.patch("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const body = req.body;
		const userModified = await service.update(id, body);
		res.json({
			message: "updated",
			userModified,
		});
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await service.delete(id);
		res.json({
			message: "deleted",
			response,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
