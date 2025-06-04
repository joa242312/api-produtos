const express = require("express")
const router = express.Router()
const probutosControllers = require('../controllers/produstos')
const middlewares = require('../middlewares/produtos')

router.get("/probutos", probutosControllers.getProdutos)
router.post("/probutos", middlewares.valideteCreateProduto, probutosControllers.createProdusto)
router.delete('/probutos/:id', middlewares.valideteDeleteProduto, probutosControllers.deleteProduto)


module.exports = router;