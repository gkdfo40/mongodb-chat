const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const router = require('./routes/userInfo');
const login = require('./routes/login');
const signup = require('./routes/signup');
const logout = require('./routes/logout');
var app = express();
app
  .use(express.static(path.join(__dirname, 'public')))
  .use('/api/userInfo', router)
  .use('/login', login)
  .use('/signup', signup)
  .use('/logout', logout)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log('Listening on ${PORT}'))
