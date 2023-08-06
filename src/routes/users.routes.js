const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Aqui van todos los usuario");
});

module.exports = router;
