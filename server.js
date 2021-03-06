require('dotenv').config()
const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Sequelize = require('sequelize');
const { Companies } = require('./models');

const app = express();
app.use(express.static('public'))
app.use(express.json());

app.engine('html', es6Renderer);     
app.set('views', 'templates');       
app.set('view engine', 'html');

//set up session middleware
const sess = {
    secret: 'keyboard cat',
    cookie: {maxAge: 60000}
}
app.use(session(sess))

// Sign in With Facebook
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
// Sign in with Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/careers', async (req, res) => {
  const companies = await Companies.findAll();
  const companyIds = Object.keys(companies)
  let companiesArray = companyIds.map( id => companies[id])

  res.render('careers', {
    locals: {
      companiesArray
    }
  })
  // res.json(companies);
})

app.post('/careers', async (req, res) => {
  const { companyName, pay, jobType, trailerType, 
  experienceRequirement, willTrain, headquarters, 
  homeTime, endorsements, companySite } = req.body;
  const newCompany = await Companies.create ({
    companyName,
    pay,
    jobType,
    trailerType,
    experienceRequirement,
    willTrain,
    headquarters,
    homeTime,
    endorsements,
    companySite
  });
  res.json({
      "message": "new user created successfuly",
      "id": newCompany.id
  });
});

// Sign in With Facebook Callback
app.get('/auth/facebook',
  passport.authenticate('facebook'));
// Sign in With Facebook Callback
app.get('/auth/facebook/callback',  // or callback
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

//Sign in With Google Callback
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));
//Sign in With Google Callback
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
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
    http://localhost:3000
    `);
});