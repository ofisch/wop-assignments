'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const port = 3000;

const username = 'foo';
const password = 'bar';

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/secret', (req, res) => {
  res.render('secret');

  if (req.session.logged != true) {
    res.redirect('/form');
  }
});

app.post('/login', (req, res) => {
  if (req.body.password === password && req.body.username === username) {
    req.session.logged = true;
    res.redirect('/secret');
  } else {
    req.session.logged = false;
    res.redirect('/form');
  }
});

app.get('/setCookie/:clr', (req, res) => {
  res.cookie('color', req.params.clr).send('cookie set');
});

app.get('/getCookie', (req, res) => {
  res.send(`color: ${req.cookies.color}`);
});

app.get('/deleteCookie', (req, res) => {
  res.clearCookie('color');
  res.send('cookie deleted');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
