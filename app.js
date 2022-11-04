const express = require('express')
const app = express()

app.get("/",(req,res) => {
    res.send(`<a href="./about"> redirect </a>`)
})
app.get("/about",(req,res) => {
    res.send("there's nothing about me")
})

app.listen(3000)