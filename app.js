const express = require('express');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const path = require("path");
const {createPool} = require("mysql");
const env = require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const root = process.env.rootMatterz;

const pool = createPool({
    host:"localhost",
    user: "root",
    password: root,
    database: "trading_bot",
    connectionLimit: 10    
});



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

pool.query(`select * from users`, (err, result, fields) => {
    if(err){
        return console.log(err)
    }
    return console.log(result);
})

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

    const newUser = {email: req.body.email, password: hashedPassword};

    let users = [];

    try {
        const dbContent =  db.query('SELECT * FROM users');

        users = JSON.parse(dbContent);

        if(!Array.isArray(users))
            {
                users = [];
            }

    } catch (error) {
        if(error.code !== "ENOENT")
            {
                console.error(error);
                res.status(500).json({
                    success: false,
                    message: "An error occured while reading from the database"
                });
                return;
            }
    }

    const existingUser = users.find((user) => user.email === newUser.email);

    if(existingUser)
        {
            res
            .status(400)
            .json({ success: false, message: "Email is Already In Use"});
            return;
        }

        users.push(newUser)
    try { 
        JSON.stringify(users);
        
        db.query('INSERT INTO users (email, password, salt) VALUES (?, ?, ?)', [users], (err, result) => {
            console.log(result);
      
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({
             success:false,
             message: "An error occured trying to load from the database server",
        });
        return;
    }

    res.json({success: true, message:"Account created successfully"})
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
