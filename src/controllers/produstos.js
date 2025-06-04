const produtosModel = require("../models/produtos")
async function getProdutos(req, res) {
    try {
        const probutos = await produtosModel.getProdutos()
        return res.status(200).send(probutos)
    } catch (error) {
        console.error(error)
        return res.status(500).send("Error ao buscar probutos")
    }

}
async function createProdusto(req, res) {
    try {
        const probutos = await  produtosModel.createProdusto(req.body)

        return res.status(201).send(probutos)
    } catch (error) {
        console.error(error)
        return res.status(500).send("error a criar produto")
    }

}
async function deleteProduto(req,res) {
    const {id} =req.params;
    try {
        await produtosModel.deleteProduto(id)
        return res.status(202).send('Produto deltado com sucesso')
    } catch (error) {
        return res.status(500).send('Error ao deletar o produto')
    }
}

module.exports = {
    getProdutos,
    createProdusto,
    deleteProduto

}