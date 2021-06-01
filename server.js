require('dotenv').config()
const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const app = express();
app.use(express.static('public'))

app.engine('html', es6Renderer);     
app.set('views', 'templates');       
app.set('view engine', 'html');

//set up session middleware
const sess = {
    secret: 'keyboard cat',
    cookie: {maxAge: 60000}
}
app.use(session(sess))


passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID_FB,
    clientSecret: process.env.CLIENT_SECRET_FB,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/careers', (req, res) => {
  res.render('careers')
})


app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',  // or callback
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/about', (req, res) => {
  res.render('about')
})



app.get('*', (req, res) => {
    res.send('404')
})

// Setting up PORT and link to Localhost
app.listen(process.env.PORT || 3000, () => {
    console.log(`
    localhost:3000
    `);
});