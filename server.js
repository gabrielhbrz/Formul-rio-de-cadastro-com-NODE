const express = require('express')
const path = require('path')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const usuarios = []

app.post('/api/enviar', (req, res) => {
    const {nome, email, idade} = req.body

    if (!nome || !email || !idade){
        return res.status(400).json({ mensagem: 'Preencha todos os campos!' })
    }

    usuarios.push({nome, email, idade})

    res.json({ sucesso: true, mensagem: `Usuario ${nome} cadastrado com sucesso!`})
})


app.get('/api/usuarios', (req, res) =>{
    res.json(usuarios)
})

app.listen(PORT, () =>{
    console.log(`Servidor rodando na em http://localhost:${PORT}`)
})