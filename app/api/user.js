const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Post = require('../../models/Post')
module.exports = (app, db) => {

    // GET ALL USERS
    app.get("/users", (req, res) =>
        db.User.findAll({
            include: [{
                model: db.Post,
                as: 'posts',
                required: false
            }]
        }).then((result) => res.json(result))
    );

    // GET ONE USER BY PRIMARY KEY(ID)
    app.get("/user/:id", (req, res) =>
        db.User.findByPk(req.params.id).then((result) => res.json(result))
    );

    // GET ONE USER BY USERNAME
    app.get("/getUser", (req, res) =>
        db.User.findOne({ where: { username: req.body.username } })
            .then(result => res.json(result))
    );

    // CREATE USER VIA BCRYPT(WITH TOKEN)
    app.post("/user", (req, res) => {
        bcrypt.hash(req.body.password, 10)
            .then(hashed => {
                if (req.body.password.length < 8) {
                    hashed = req.body.password;
                }
                db.User.create({ name: req.body.name,username: req.body.username, password: hashed })
                    .then(newUser => {
                        let payload = { subject: newUser.id }
                        let token = jwt.sign(payload, 'sweetpatatas')
                        res.json({ "result": "success", "data": token })
                    })
                    .catch(err => res.json({ "result": "failed", "data": err }))
            })
            .catch(err => res.json(err))
    }
    );

    // LOGIN USER VALIDATE
    app.post('/login', (req, res) => {
        let userData = req.body

        db.User.findOne({ where: { username: userData.username } })
            .then(result => {
                if (result == null) {
                    res.json({ "result": "failed", "error": "Login failed" })
                } else {
                    bcrypt.compare(userData.password, result.password)
                        .then(isValid => {
                            if (isValid) {
                                let payload = { subject: result.id }
                                let token = jwt.sign(payload, 'sweetpatatas')
                                res.json({ "result": "success", "data": token })
                            } else {
                                res.json({ "result": "failed", "error": "Login failed" })
                            }
                        })
                        .catch(err => res.json(err))
                }
            })
    })

    // EDIT ONE USER
    app.put("/user/:id", (req, res) =>
        db.User.update({
            username: req.body.username,
            password: req.body.password
        },
            {
                where: {
                    id: req.params.id
                }
            }).then((result) => res.json(result))
    );

    // DELETE ONE USER
    app.delete("/user/:id", (req, res) =>
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => res.json(result))
    );


    // TOKEN TESTING(IGNORE THIS)
    function verifyToken(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauthorized request')
        }
        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send('Unauthorized request')
        }
        let payload = jwt.verify(token, 'sweetpatatas')
        if (!payload) {
            return res.status(401).send('Unauthorized request')
        }
        req.userId = payload.subject
        next()
    }

    // app.get('/spcial', verifyToken, (req,res)=>{
    //     let e
    // })
}