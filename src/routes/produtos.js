const express = require ("express")
const router = express.Router()
const probutosControllers = require('../controllers/produstos')

router.get("/probutos", probutosControllers.getProdutos)
router.post("/probutos", probutosControllers.createProdusto)

module.exports =router;