const pool =require('./database')
async function getProdutos(){
    const produtos = await pool.query('SELECT * FROM probutos')
    return produtos.rows
}
async function createProdusto(produto){
    try {
        const insertProdutos = await pool.query(
            `ISERT INTO podutos
            (nome,categoria,preco,image_url)
            VALURES($1 , $2, $3 , $4)
            Returning *
            `,[
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
module.exports ={
    getProdutos,
    createProdusto
}