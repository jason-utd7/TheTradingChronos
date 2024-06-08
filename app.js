const express = require('express')
const morgan = require('morgan')
const bcrypt = require('bcrypt')
const path = require("path")


const app = express()
const port = process.env.PORT || 3000

app.set("view engine", "ejs")
app.use(express.static("css"))
app.use(express.static("JavaScript"))
app.use(express.static("Images"))
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))
app.use(express.json())

app.listen(port, () => {
    console.log("We are listening at Port: ", port )
})

app.get("/", (req, res) => {
    res.render("index", { title: "Home" })
})



