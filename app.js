const express = require('express')
const app = express()
const fs = require('fs')

app.get("/",(req,res) => {
    fs.readFileSync("./index.html","utf-8",(err,data) => {
        res.send(`${data}`)
    })
})
app.get("/about",(req,res) => {
    res.send("there's nothing about me")
})

app.listen(3000)