const express = require("express");
const router = express.Router();
const fonction = require("../Controllers/fonction.controller");
const authMiddleware = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/create", authMiddleware, admin, fonction.create);
router.get("/find-all", authMiddleware, admin, fonction.findAll);
router.put("/update/:id", authMiddleware, admin, fonction.update);
router.delete("/delete/:id", authMiddleware, admin, fonction.delete);
router.post("/fonction-employee", authMiddleware, admin, fonction.employeeFonction);
router.put("/fonction-employee", authMiddleware, admin, fonction.employeeFonction);
router.delete("/remove-fonction", authMiddleware, admin, fonction.employeeFonctionDelete);
router.get("/employee-without-fonction", authMiddleware, admin, fonction.getAllWithOutFonction);
router.get("/employee-with-fonction", authMiddleware, admin, fonction.getAllWithFonction);

module.exports = router;
