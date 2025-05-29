const express = require("express")
const app = express()
const port = 6579
const { Pool } = require("pg")

const pool = new Pool({
    user: 'postgres.nvwruviltrndiaimeejc',
    host: 'aws-0-us-east-2.pooler.supabase.com',
    database: 'postgres',
    password: "Jg162006@",
    port: 5432

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
VALUES(
'${nome}',
'${preco}',
'${categoria}',
'${image_url}' 
)
RETURNING *
`)
        res.status(201).send(probuto.rows[0])
    } catch (error) {
        console.error(error)
        return res.status(500).send("error  ao cadastrar o produtos")
    }
})
app.get("/probutos", async (req,res) => {
    try {
        const probutos = await pool.query("SELECT * FROM probutos")
        return res.status(200).send(probutos.rows)
        } catch (error) { 
        console.error(error)
        return res.status(500).send("Error ao buscar probutos")
    }
})

app.listen(port, () => {
    console.log(`O sevirdor está roudado na ${port}`)
})
