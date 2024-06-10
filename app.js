<<<<<<< HEAD
const express = require('express');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const path = require("path");
const db = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("css"));
app.use(express.static("JavaScript"));
app.use(express.static("Images"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());

app.listen(port, () => {
    console.log("We are listening at Port: ", port);
});

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("Please enter email and password.");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    db.query('INSERT INTO users (email, password, salt) VALUES (?, ?, ?)', [email, hashedPassword, salt], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Server error.");
        }
        res.status(201).send("User registered.");
    });
});

app.post("/signin", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("Please enter email and password.");
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Server error.");
        }
        if (result.length === 0) {
            return res.status(401).send("Invalid email or password.");
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send("Invalid email or password.");
        }

        res.status(200).send("User signed in.");
    });
});
=======
const express = require('express')
const morgan = require('morgan')
const bcrypt = require('bcrypt')
const path = require("path")
const mySQL = require("mysql")


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



>>>>>>> b2ec420b11edb6b56ed738b04cac444ffc1c1f9d
