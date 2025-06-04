const pool = require('./database')
async function getProdutos() {
    const produtos = await pool.query('SELECT * FROM probutos')
    return produtos.rows
}
async function createProdusto(produto) {
    try {
        const insertProdutos = await pool.query(
            `INSERT INTO probutos
            (nome,categoria,preco,image_url)
            VALUES($1 , $2, $3 , $4)
            Returning *
            `, [
            produto.nome,
            produto.categoria,
            produto.preco,
            produto.image_url
        ])
        return insertProdutos.rows[0]
    } catch (error) {
        console.error(error)
        throw new Error("error ao criar produto");
    }
}
async function deleteProduto(id) {
    try {
        await pool.query(`DELETE FROM probutos WHERE id = $1`, [id])
    } catch (error) {
        console.error(error)
        throw Error('Error ao deltar produto')
    }
}
module.exports = {
    getProdutos,
    createProdusto,
    deleteProduto
}