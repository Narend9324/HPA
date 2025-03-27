const express = require("express");
const { handleMessage } = require("../controllers/nadoController");

const router = express.Router();

// Route to handle user messages and reuse threads
router.post("/", handleMessage);

module.exports = router;