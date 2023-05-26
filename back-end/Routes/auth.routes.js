const express = require("express");
const router = express.Router();
const auth = require("../Controllers/auth.controller");
const authMiddleware = require("../middleware/auth");

router.post("/register", auth.register)
router.post("/login", auth.login)
router.post("/logout", authMiddleware, auth.logout)
router.get("/profile", authMiddleware, auth.profile)
router.get("/edit", authMiddleware, auth.edit)
router.put("/edit-profile", authMiddleware, auth.editProfile)

module.exports = router;
