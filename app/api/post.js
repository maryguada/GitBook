const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
module.exports = (app, db) => {

    // GET ALL POSTS
    app.get("/posts", (req, res) =>
        db.Post.findAll().then((result) => res.json(result))
    );

    // GET ONE POST BY PRIMARY KEY(ID)
    app.get("/post/:id", (req, res) =>
        db.Post.findByPk(req.params.id).then((result) => res.json(result))
    );

    // CREATE POST BY USER
    app.post("/post/:userId", (req,res)=>{
        db.User.findByPk(req.params.userId)
        .then(user=>{
            user.createPost(req.body)
            .then(newPost=>res.json(newPost))
        })
    })

    // EDIT ONE POST
    app.put("/post/:id", (req, res) =>
        db.Post.update({
            username: req.body.username,
            password: req.body.password
        },
            {
                where: {
                    id: req.params.id
                }
            }).then((result) => res.json(result))
    );

    // DELETE ONE POST
    app.delete("/post/:id", (req, res) =>
        db.Post.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => res.json(result))
    );
}