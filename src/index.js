const express = require ('express');
const app = express();
const path = require('path');
const port = 5000;
const hbs = require('hbs');
const collection = require('./db/mongodb')
const templatePath = path.join(__dirname,"../templates")


app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password,
    }
    try{
        await collection.insertMany([data]);
        res.status(200).render("home1");

    } catch(error){
        console.error(`Error inserting data into the database: ${error}`);
        res.status(500).send("Internal Server Error");
    }
});
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({name:req.body.name})
        if(check.password === req.body.password){
            res.status(200).render("home2");
        }
        else{
            res.status(400).send("Wrong Password");
        }
    } catch {
        res.status(400).send("Wrong details");
    }
});
app.get("*", (req, res) => {
    res.status(404).send("Page not found");
});

app.listen(port, (error) => {
    if (error) {
        console.log(`Server connection error: ${error}`);
    } else {
        console.log(`Server connection successful: http://localhost:${port}`);
    }
});
