const express = require('express')
const morgan = require('morgan')
const bcrypt = require('bcrypt')
const path = require("path")
const fileURLPath = require('url')
const __filename = fileURLPath(import.meta.url)
const __dirname = path.__dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

app.set("view engine", "ejs")
app.use(express.static("css"))
app.use("/javascript", express.static(path.join(__dirname, "javascript")))
app.use("/images", express.static(path.join(__dirname, "images")))
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))
app.use(express.json())

app.listen(port, () => {
    console.log("We are listening at Port: ", port )
})

app.get("/", (req, res) => {
    res.render("", { title: "Home" })
})

