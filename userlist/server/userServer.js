
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

var cors = require("cors");

const port = 8081;
// https://user-list-happitt.c9users.io:8081/api/users

const User = require("./user");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

mongoose.connect("mongodb://admin:password123@ds131932.mlab.com:31932/userlist");

app.get("/api/users", (req, res) => {
    User.find((err, users) => {
        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.end(err.toString());
        } else {
            console.log("Getting all users.");
            let usersArray = [];
            users.forEach(user => usersArray.push(user)); 
            res.status(200).json(usersArray);
        }
    });
});

app.post("/api/users", (req, res) => {
    let newUser = new User();
    console.log(req.body);
    newUser.first_name = req.body.first_name;
    newUser.last_name = req.body.last_name;
    newUser.sex = req.body.sex;
    newUser.age = req.body.age;
    newUser.password = req.body.password;
    
    newUser.save((err) => {
        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.end(err.toString());
        } else {
            console.log("Created a user.");
            res.status(200).json(newUser);
        }
    });
});

app.put("/api/users/:userId", (req, res) => {
    let id = req.params.userId;
    User.findById(id, (err, user) => {
        if (err) {
            // console.log(err);
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.end(err.toString());
        } else {
            console.log(req.body);
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.sex = req.body.sex;
            user.age = req.body.age;
            user.password = req.body.password;
            user.save((err) => {
                if (err) {
                    // console.log(err);
                    res.writeHead(500, {"Content-Type": "text/plain"});
                    res.end(err.toString());
                } else {
                    console.log("Edited a user.");
                    User.findById(id, (err, user) => {
                        if (err) {
                            // console.log(err);
                            res.writeHead(500, {"Content-Type": "text/plain"});
                            res.end(err.toString());
                        } else {
                            res.status(200).json(user);
                        }
                    });
                }
            });
        }
    });
});

app.delete("/api/users/:userId", (req, res) => {
    User.find((err, users) => {
        if (err) {
            // console.log(err);
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.end(err.toString());
        } else {
            let id = req.params.userId;
            User.remove({_id: id}, (err) => {
                if (err) {
                    // console.log(err);
                    res.writeHead(500, {"Content-Type": "text/plain"});
                    res.end(err.toString());
                } else {
                    console.log("Deleted a user.");
                    res.send("Deleted a user from DB.");
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`The user server has started on port ${port}...`);
});





