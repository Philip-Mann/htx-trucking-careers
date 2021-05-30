const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const session = require('express-session');
const passport = require('passport');

const app = express();
app.use(express.static('public'))

app.engine('html', es6Renderer);     
app.set('views', 'templates');       
app.set('view engine', 'html');

const sess = {
    secret: 'keyboard cat',
    cookie: {maxAge: 60000}
}
//set up session middleware
app.use(session(sess))


app.get('/', (req, res) => {
    res.render('home')
})



app.get('/signup', (req, res) => {
    res.render('login')
})



app.get('*', (req, res) => {
    res.send('404')
})

// Setting up PORT and link to Localhost
const portUrl = `http://localhost:`;
const portNum = 3000;
app.listen(process.env.PORT || portNum, () => {
    console.log(portUrl + portNum);
});