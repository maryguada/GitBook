const express = require("express");
const app = express();
const path = require('path')
const GitHubStrategy = require('passport-github').Strategy;
const passport = require('passport')
const User = require('./models').User
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static( __dirname + '/public/dist/public'));

passport.use(new GitHubStrategy({
    clientID: "f238e78c777380efe8db",
    clientSecret: "7870a58b5c634c133d52dc7b46bfae023f1b1bf1",
    callbackURL: "http://localhost:8000/user/signin/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile.id)
    // console.log(accessToken)
    // console.log(refreshToken)
    User.findOrCreate({ where:{ githubId: profile.id }})
    .then(user=>{
        return cb(user);
    })
    .catch(err=> console.log(err))
  }
));

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/user/signin/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.    res.redirect('/dashboard');
  });

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

app.listen(8000, () => console.log("listening on port 8000"));