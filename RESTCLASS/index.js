const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');


app.use(express.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {   id : uuidv4(),
        username : "rohit",
        content : "ilp"
    },
    
    {   id : uuidv4(),
        username : "roht",
        content : "il"
    },
    
    {   id : uuidv4(),
        username : "rhit",
        content : "lp"
    }
    
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});


app.post("/posts", (req, res) => {
      let { username, content } = req.body;
      let id = uuidv4();
      posts.push({id, username, content});
      res.redirect("/posts");
});


app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});


app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newcontent=req.body.content;
    console.log(newcontent);
    res.send("patch request working");
});

app.listen(port, () => {
    console.log("listening to port : 8080");
});
