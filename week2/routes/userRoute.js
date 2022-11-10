'use strict';
const express = require('express');
const { body } = require('express-validator');
// uusii requirei testii varten
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
// noi kaks
const {user_list_get, user_get, user_post, user_create_post} = require('../controllers/userController');
const router = express.Router();

router.get('/', user_list_get);

router.get('/:id', user_get);

router.post('/', body('name').isLength({min: 3}).escape(), 
                body('email').isEmail(), 
                body('passwd').matches('^(?=.*[\p{Lu}]).{8,}'), user_create_post);

router.put('/', (req, res) => {
  res.send('From this endpoint you can edit users.');
});

router.delete('/', (req, res) => {
  res.send('From this endpoint you can delete users.');
});

module.exports = router;