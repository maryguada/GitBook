const express = require("express");
const app = express();
const path = require('path')
const GitHubStrategy = require('passport-github').Strategy;
const Passport = require('passport').Passport
const authPassport = new Passport()
const gitPassport = new Passport();
const appUser = require('./app/api/user')
const appPost = require('./app/api/post')
const db = require('./models')
const User = require('./models').User
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Post = require('./models/Post')
const bcrypt = require('bcrypt')
const randtoken = require('rand-token')
const refreshTokens = {};

const SECRET = 'VERY_SECRET_KEY!';
const passportOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
};

app.use(cors())
app.use(authPassport.initialize())
// app.use(gitPassport.initialize())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public/dist/public'));


// gitPassport.serializeUser((user, cb) => {
//   cb(null, user)
// })
// gitPassport.deserializeUser((user, cb) => {
//   cb(null, user)
// })

// gitPassport.use(new GitHubStrategy({
//   clientID: "f238e78c777380efe8db",
//   clientSecret: "7870a58b5c634c133d52dc7b46bfae023f1b1bf1",
//   callbackURL: "http://localhost:8000/user/signin/callback"
// },
//   function (accessToken, refreshToken, profile, cb) {
//     // console.log(profile.id)
//     // console.log(accessToken)
//     // console.log(refreshToken)
//     User.findOrCreate({ where: { githubId: profile.id, name: profile._json.name, username: profile._json.login } })
//       .then(user => {

//         return cb(null, user);
//       })
//       .catch(err => console.log(err))
//   }
// ));

authPassport.use(new JwtStrategy(passportOpts, function (jwtPayload, done) {
  const expirationDate = new Date(jwtPayload.exp * 1000);
  if (expirationDate < new Date()) {
    return done(null, false);
  }
  done(null, jwtPayload);
}))
authPassport.serializeUser(function (user, done) {
  done(null, user.username)
});
appUser(app, db)
appPost(app, db)

// app.get('/auth/github',
//   gitPassport.authenticate('github'));

// app.get('/user/signin/callback',
//   gitPassport.authenticate('github', { failureRedirect: '/login' }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     console.log(req.session.passport.user)
//     const token = jwt.sign({user:req.session.passport.user}, SECRET, { expiresIn: 600 })
//     console.log(token)
//     const refreshToken = randtoken.uid(256);
//     refreshTokens[refreshToken] = req.session.passport.user.username;
//     res.json({ jwt: token, refreshToken: refreshToken });
//   });



app.get("/users", authPassport.authenticate('jwt'), (req, res) =>
  User.findAll({
    include: [{
      model: Post,
      as: 'posts',
      required: false
    }]
  }).then((result) => res.json(result))
);


app.post('/login', (req, res) => {
  let userData = req.body
  User.findOne({ where: { username: userData.username } })
    .then(result => {
      if (result['password'] == null) {
        res.json({ "result": "failed", "error": "Login failed" })
      }
      if (result == null) {
        res.json({ "result": "failed", "error": "Login failed" })
      } else {
        bcrypt.compare(userData.password, result.password)
          .then(isValid => {
            if (isValid) {
              const token = jwt.sign({ user:result }, SECRET, { expiresIn: 600 })
              console.log(token)
              const refreshToken = randtoken.uid(256);
              refreshTokens[refreshToken] = result.username;
              console.log(refreshToken)
              res.json({ jwt: token, refreshToken: refreshToken });
            } else {
              res.json({ "result": "failed", "error": "Login failed" })
            }
          })
          .catch(err => res.json(err))
      }
    })
})

// app.post('/login', function (req, res) { 
//   User.findOne({ where: { username: req.body.username } })
//   .then(data=>{
//     console.log(data)
//     const token = jwt.sign({data}, SECRET, { expiresIn: 600 }) 
//     const refreshToken = randtoken.uid(256);
//     refreshTokens[refreshToken] = req.body.username;
//     res.json({jwt: token, refreshToken: refreshToken});
//   })
// });
// console.log(refreshTokens)
app.all("*", (req, res, next) => {
  res.sendFile(path.resolve("./public/dist/public/index.html"))
});

app.listen(8000, () => console.log("listening on port 8000"));