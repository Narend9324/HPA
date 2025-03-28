const express = require("express");
const {
  handleMessage,
  getAllMessages,
} = require("../controllers/nadoController");

const router = express.Router();

// Route to handle user messages and reuse threads
router.post("/", handleMessage);

router.get("/messages", getAllMessages);

module.exports = router;
