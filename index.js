const express = require("express")
const app = express()
const port = 6579
require("dotenv").config()
const { Pool } = require("pg")

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NOME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT

})

app.use(express.json())
app.post('/probutos', async (req, res) => {
    const { nome, preco, categoria, image_url } = req.body
    if (!nome || !preco || !categoria || !image_url) {
        return res.status(400).send("todos os campos são obigatorios")
    }
    if (nome.langeth > 100) {
        return res.status(400).send('Nome pode tr no maximo 100 caracteres')
    }
    if (categoria.langeth > 50) {
        return res.status(400).send('Nome pode tr no maximo 100 caracteres')
    }
    try {
        const probuto = await pool.query(`
     INSERT INTO probutos(nome,preco,categoria,image_url)
      VALUES($1 $2 $3 $4)
      RETURNING *
      `, (nome, preco, categoria, image_url))
        res.status(201).send(probuto.rows[0])
    } catch (error) {
        console.error(error)
        return res.status(500).send("error  ao cadastrar o produtos")
    }
})
app.get("/probutos", async (req, res) => {
    try {
        const probutos = await pool.query("SELECT * FROM probutos")
        return res.status(200).send(probutos.rows)
    } catch (error) {
        console.error(error)
        return res.status(500).send("Error ao buscar probutos")
    }
})
app.get('/probutos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const probuto = await pool.query(`
            SELECT * FROM probutos WHERE id = $1`,(id))
        if (!probuto.rows.length) { return res.status(400).sand('Produtos não encontados') }
        return res.send(probuto.rows[0])
    } catch (error) {
        console.error(error)
        return res.status(500).send('error ao buscar probuto')
    }
})
app.delete('/probutos/:id', async (req, res) => {
    const probutos = await pool.query(`SELECT * FROM probustos WHERE id= $1`,(id))
    if (probutos.rows.length) {
        return res.status(404).send('produtos não encontrado')
    }
    const { id } = req.params
    try {
        await pool.query(`
        DELETE FROM probutos WHERE id = $1`, (id))
        return res.status(202).send('Produtos deletado com sucesso')

    } catch (error) {
        console.error(error)
        return res.status(500).send('error ao deletar o produto')
    }
})

app.listen(port, () => {
    console.log(`O sevirdor está roudado na ${port}`)
})
