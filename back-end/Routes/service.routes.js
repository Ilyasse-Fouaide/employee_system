const express = require("express");
const router = express.Router();
const service = require("../Controllers/service.controller");
const authMiddleware = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/create", authMiddleware, admin, service.create);
router.get("/find-all", authMiddleware, admin, service.findAll);
router.put("/update/:id", authMiddleware, admin, service.update);
router.delete("/delete/:id", authMiddleware, admin, service.delete);
router.post("/service-employee", authMiddleware, admin, service.employeeService);
router.put("/service-employee", authMiddleware, admin, service.employeeService);
router.delete("/remove-service", authMiddleware, admin, service.employeeServiceDelete);
router.get("/employee-without-service", authMiddleware, admin, service.getAllWithOutService);
router.get("/employee-with-service", authMiddleware, admin, service.getAllWithService);

module.exports = router;
