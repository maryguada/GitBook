const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
module.exports = (app, db) => {

    // GET ALL POSTS
    app.get("/posts", (req, res) =>
        db.Post.findAll({
            include: [{
                all: true
            }
            ]
        }).then((result) => res.json(result))
    );

    // GET RECENT POSTS
    app.get("/recentposts/:count", (req, res) => {
        db.Post.findAll({
            limit: Number(req.params.count),
            order: [['createdAt', 'DESC']],
            include: [{
                all: true
            }
            ]
        }).then((result) => res.json(result))
    });

    // GET ONE POST BY PRIMARY KEY(ID)
    app.get("/post/:id", (req, res) =>
        db.Post.findByPk(req.params.id).then((result) => res.json(result))
    );

    // CREATE POST BY USER
    app.post("/post/:userId", (req, res) => {
        db.User.findByPk(req.params.userId)
            .then(user => {
                user.createPost({ content: req.body.content, postedBy: user.name, caption: req.body.caption })
                    .then(newPost => res.json(newPost))
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

    //SEARCH FOR TAG
    app.get("/searchtags/:tag", (req,res) => {
        db.Post.findAll({
            where: {
                tag1: req.params.tag
            }
        }).then((result) => res.json(result))
    })

    // ADD COMMENT TO POST
    app.post("/comment/:id", (req, res) => {
        db.Post.findByPk(req.params.id)
            .then(myPost => {
                db.User.findByPk(2)
                    .then(myUser => {
                        myPost.createComment({commented_by: myUser.name, comment: req.body.comment})
                            .then(() => res.json('Comment added'))
                    })
            })
    })

    // USER LIKE POST
    app.post("/like/:id", (req, res) => {
        db.Post.findByPk(req.params.id)
            .then(thisPost => {
                db.User.findByPk(1)
                    .then(myUser => {
                        thisPost.addLike(myUser)
                            .then(() => res.json('post liked!'))
                    })
            })
    })

    // USER UNLIKE POST
    app.put("/like/:id", (req, res) => {
        db.Post.findByPk(req.params.id)
            .then(thisPost => {
                db.User.findByPk(1)
                    .then(myUser => {
                        thisPost.removeLike(myUser)
                            .then(() => res.json('post unliked!'))
                    })
            })
        })
}