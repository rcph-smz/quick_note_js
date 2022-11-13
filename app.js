const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParse = require('body-parser')
const fs = require('fs')

app.use(bodyParse.urlencoded({ extended: true }))

mongoose.connect(`${fs.readFileSync('.connection',"utf-8").split("<password>").join(fs.readFileSync(".env","utf-8"))}` || process.env.CONNECTION)

const Schema = {
    text_note: String
}
const Note = mongoose.model("Note", Schema)

const connection = mongoose.connection

app.get("/", async (req, res) => {
    res.write(fs.readFileSync("./index.html", "utf-8"))
    await new Promise((resolved, rejected) => {
        const collection = connection.db.collection("notes")
        collection.find({}).toArray(function (err, data) {
            data.forEach((item, index) => {
                if (index == 0) res.write('<script async defer>')
                res.write(`quick_note("${item.text_note}")\n`)
                if (data.length - 1 == index) res.write(`</script>`)
            })
            resolved()
        })
    })
    res.end()
})

app.post("/", (req, res) => {
    let note = new Note({
        text_note: req.body.text_note
    })
    note.save()
    res.redirect("/")
})

app.listen(fs.readFileSync('.port',"utf-8") || process.env.PORT, () => {
    console.log(`Listening on PORT ${fs.readFileSync('.port',"utf-8") || process.env.PORT}`)
})