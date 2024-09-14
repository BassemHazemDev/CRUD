const e = require('express')
const express = require('express')
const app = express()
const mysql2 = require('mysql2')
const cors = require("cors")
app.use(express.json())
app.use(cors())


const query = mysql2.createConnection({
    host: '127.0.0.1',  // Localhost IP
    port: 3306,         // Default MySQL port
    user: 'root',
    password: '',
    database: 'shopping'
})

app.get('/', (req, res) => {
    query.execute('select * from products', (err, data) => {
       data ? res.json({ message: "done", data }) : res.json({ message: "error"})
    })
})

app.post('/products', (req, res) => {
    const { name, price, description } = req.body
    query.execute(`insert into products (name,price,description) values ("${name}","${price}","${description}")`, (err, data) => {
        err ? res.json({ message: "error" }) : res.json({ message: "done" })
    })
})

app.delete('/products', (req, res) => {
    const { id } = req.body
    query.execute(`delete from products where id = ${id}`, (err, data) => {
        (data && data.affectedRows==0) ? res.json({ message: "error" }) : res.json({ message: "done" })
    })
})

app.put('/products', (req, res) => {
    const { id, name ,price , description } = req.body
    query.execute(`update products set name= "${name}" , price ="${price}", description="${description}" where id=${id}`, (err, data) => {
        err ? res.json({ message: "error" }) : res.json({ message: "done" })
    })
})

app.get("/products/:id", (req, res) => {
    const id = req.params.id
    query.execute(`select * from products where id = ${id}`, (err, data) => {
        err ? res.json({ message: "error" }) : res.json({ message: "done" ,data})
    })
})


app.listen(3000)