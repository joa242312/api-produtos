const express = require("express")
const app = express()
const port = 6579;
const produtosRoutes = require('../api-produtos/src/routes/produtos')

app.use(express.json())
app.use(produtosRoutes)

app.listen(port, () => {
    console.log(`Sevidor roudador na porta ${port}`)
})