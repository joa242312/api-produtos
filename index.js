const express = require("express")
const app =express()
const port = 6579
const produtosDb = []
const userDb =[]

app.use(express.json())

app.get("/", (req, res) =>{
    res.send(" Olá Joao!")
})
app.post("/produtos", (req, res) => {
    const {nome,preco, categoria} = req.body
    
    if (!nome || !preco || !categoria){
        return res.status(400).send("nome,preco e categoria são obrigatorios ")
    }
    const produtos ={
        nome: nome,
        preco: preco,
        categoria:categoria
    
    }
      produtosDb.push(produtos);
      res.status(200).send(produtos)
})
app.get("/produtos", (req, res) => {
    res.send(produtosDb)
})

app.post("/usuarios", (req, res) => {
    const {nome,email, senha} = req.body

    if (!nome || !email || !senha){
        return res.status(400).send("email, nome e senha são obrigatorio")
    }
    userDb.push({nome, email, senha})
    res.send("deu certo")
    
})

 
app.listen(port, () => {
console.log(`O sevirdor está roudado na ${port}`)
})
