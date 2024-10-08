import express from 'express'
import mysql2 from 'mysql2'
import cors  from 'cors'

const app = express()
app.use(express.json())
app.use(cors())


const query = mysql2.createConnection({
    host: 'localhost',
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