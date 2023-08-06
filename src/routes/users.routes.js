const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Aqui van todos los usuario");
});

router.post("/", (req, res) => {
	const body = req.body;
	res.json({
		message: "created user",
		data: body,
	});
});

module.exports = router;
