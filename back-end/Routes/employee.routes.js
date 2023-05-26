const express = require("express");
const router = express.Router();
const auth = require("../Controllers/employee.controller");
const authMiddleware = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/create", authMiddleware, admin, auth.create)
router.get("/get-all", auth.getAll)
router.post("/get-employee", auth.getByName)
router.get("/edit/:id", authMiddleware, admin, auth.edit)
router.put("/update/:id", authMiddleware, admin, auth.update)
router.delete("/delete/:id", authMiddleware, admin, auth.delete)

module.exports = router;
